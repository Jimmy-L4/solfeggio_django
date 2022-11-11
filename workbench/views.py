import math

from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status, viewsets

from question_bank.models import ChoiceQuestion, SightsingingQuestion, DictationQuestion, AudioDetail
from question_bank.serializers import ChoiceSerializer, SightsingingSerializer, DictationSerializer, \
    AudioDetailSerializer

# 用户
from user.models import Student
from user.serializers import UserSerializer, StudentSerializer
# 作业
from homework.models import QuesGroupRecord, SightsingingRecord
from homework.serializers import QuesGroupSerializer, SightsingingSerializer as SingRecordSerializer


# 视唱题详情
class SingDetail(APIView):

    @staticmethod
    def get(request):
        try:
            user = request.user
            if user.username == '':
                raise Exception("用户必须登录")
            userSerializer = UserSerializer(user)
        except:
            # 未登录
            return Response("用户未登录！", status=status.HTTP_401_UNAUTHORIZED)

        part_id = request.query_params['part_id']
        question_info = SightsingingSerializer(SightsingingQuestion.objects.get(part_id=part_id)).data

        audio_info = AudioDetailSerializer(AudioDetail.objects.get(part_id=part_id)).data
        question_info['audio_detail'] = audio_info

        return Response({'result': question_info})


# 提交详情
class CommitInfo(APIView):

    @staticmethod
    def get(request):
        try:
            user = request.user
            if user.username == '':
                raise Exception("用户必须登录")
            userSerializer = UserSerializer(user)
        except:
            # 未登录
            return Response("用户未登录！", status=status.HTTP_401_UNAUTHORIZED)
        # 获取参数
        pageNo = int(request.query_params['pageNo'])
        pageSize = int(request.query_params['pageSize'])
        course_list = request.query_params.getlist('course_list[]')
        part_id = request.query_params['part_id']

        # TODO 测试班级id
        test_class = [4]

        # 先获取所有学生列表,没有注册的学生要被剔除
        student_list = StudentSerializer(
            Student.objects.filter(course__in=course_list, user__isnull=False).exclude(my_class__in=test_class),
            many=True).data

        # 学生字典:key:userId,values:student_id,student_name,class_id,home_if
        # home_if表示是否交作业,交过为1,否则为0
        total_user_dic = {item['user']: [item['id'], item['name'], item['my_class'], 0] for item in student_list}
        # 添加机器人信息(合作者)
        total_user_dic[96] = ['202204', '机器人', 4, 1]
        # 再获取所有提交
        commit_list = QuesGroupSerializer(
            QuesGroupRecord.objects.filter(group_part_id=part_id[:-2], user__in=total_user_dic.keys()), many=True).data

        marked_list = [item for item in commit_list if item['teacher_score'] is not None]
        marked_len = len(marked_list)

        data = []
        # 已提交学生列表
        for item in commit_list:
            if item['coop_user'] is not None:
                coop_student = total_user_dic[item['coop_user']][1]
                # 标记为已提交作业
                total_user_dic[item['coop_user']][3] = 1
            else:
                coop_student = ''
            data.append(
                {'key': item['record_id'], 'studentId': total_user_dic[item['user']][0],
                 'studentName': total_user_dic[item['user']][1], 'coop_user': coop_student,
                 'class_id': total_user_dic[item['user']][2],
                 'AIscore': item['computer_score'], 'score': item['teacher_score'],
                 'updatedAt': item['record_time'][:-7].replace('T', ' ')})
            # 标记为已提交作业
            total_user_dic[item['user']][3] = 1
        uncommitted_user_dic = {key: value for key, value in total_user_dic.items() if value[3] == 0}
        uncommitted_len = len(uncommitted_user_dic)
        # 未提交学生列表
        for key in uncommitted_user_dic:
            data.append(
                {'key': key, 'studentId': total_user_dic[key][0], 'studentName': total_user_dic[key][1],
                 'class_id': total_user_dic[key][2], 'AIscore': 0, 'score': 0, 'updatedAt': '未提交'})
        total_len = len(data)
        totalPage = math.ceil(total_len / pageSize)
        key = (pageNo - 1) * pageSize
        top_index = total_len % pageSize if pageNo >= totalPage and total_len % pageSize != 0 else pageSize

        result = data[key:top_index + key]
        response = {'pageSize': pageSize, 'pageNo': pageNo, 'totalCount': total_len, 'totalPage': totalPage,
                    'data': result, 'total_len': total_len, 'uncommitted_len': uncommitted_len,
                    'marked_len': marked_len}

        return Response(response)


# 视唱题提交记录
class SingRecord(APIView):

    def get(self, request):
        try:
            user = request.user
            if user.username == '':
                raise Exception("用户必须登录")
            userSerializer = UserSerializer(user)
        except:
            # 未登录
            return Response("用户未登录！", status=status.HTTP_401_UNAUTHORIZED)

        record_id = request.query_params['record_id']
        record = SingRecordSerializer(SightsingingRecord.objects.get(id=record_id)).data

        return Response({'result': record})

    def put(self, request):
        try:
            user = request.user
            if user.username == '':
                raise Exception("用户必须登录")
            userSerializer = UserSerializer(user)
        except:
            # 未登录
            return Response("用户未登录！", status=status.HTTP_401_UNAUTHORIZED)

        record_id = request.data.get('id')
        # 向QuesGroupRecord中保存成绩
        group_record = QuesGroupRecord.objects.get(record_id=record_id)
        group_info = QuesGroupSerializer(group_record).data
        score = {'teacher_score': request.data.get('teacher_score')}
        group_info.update(score)
        verify_group = QuesGroupSerializer(group_record, data=group_info)
        if verify_group.is_valid():
            verify_group.save()
        else:
            print(verify_group.errors)
            return Response(verify_group.errors, status=status.HTTP_400_BAD_REQUEST)

        # 向SightsingingRecord中保存成绩
        record = SightsingingRecord.objects.get(id=record_id)
        verify_data = SingRecordSerializer(record, data=request.data)
        # 验证提交的数据是否合法
        # 不合法则返回400
        if verify_data.is_valid():
            # 序列化器将持有的数据反序列化后，
            # 保存到数据库中
            verify_data.save()
            return Response(verify_data.data, status=status.HTTP_200_OK)
        print(verify_data.errors)
        return Response(verify_data.errors, status=status.HTTP_400_BAD_REQUEST)
