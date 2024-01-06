import logging

from django.db.models import Q
from django_q.tasks import async_task
from rest_framework import status, viewsets
from rest_framework.response import Response
from rest_framework.views import APIView

from homework.models import SightsingingRecord, ChoiceRecord, DictationRecord, QuesGroupRecord, Audio, Json, Png
from homework.serializers import SightsingingSerializer, ChoiceSerializer, DictationSerializer, QuesGroupSerializer, \
    AudioSerializer, JsonSerializer, PngSerializer
# 课时状态
from manager.views import getValidLessons
# 题库
from question_bank.models import ChoiceQuestion, DictationQuestion
from question_bank.serializers import ChoiceSerializer as ChoiceInfo
from question_bank.serializers import DictationSerializer as DictationInfo
# 用户
from user.serializers import UserSerializer

logger = logging.getLogger('django')


# 获取题组状态
def GetState(group_part_id, user_id, student_id):
    state = getValidLessons(student_id)[int(group_part_id[18]) - 1]
    # 未开放
    if state == 0:
        return 3
    else:
        quesList = QuesGroupRecord.objects.filter(group_part_id=group_part_id).filter(
            Q(user=user_id) | Q(coop_user=user_id))
        # 已完成
        if len(quesList):
            return 1
        # 已逾期
        elif state == -1:
            return 2
        else:
            # 待完成
            return 0


def GetChoiceInfo(part_id, user_id):
    ques = ChoiceRecord.objects.get(part_id=part_id, user_id=user_id)
    ques = ChoiceSerializer(ques)
    return ques.data['response'], ques.data['score']


def GetDictationInfo(part_id, user_id):
    ques = DictationRecord.objects.get(part_id=part_id, user_id=user_id)
    ques = DictationSerializer(ques)
    return ques.data['png_field'], ques.data['teacher_score']


def GetSightsingingInfo(recordId):
    ques = SightsingingRecord.objects.get(id=recordId)
    ques = SightsingingSerializer(ques)
    return ques.data


class SightsingingList(APIView):

    def get(self, request):
        return Response("接口未开放", status=status.HTTP_404_NOT_FOUND)

    def post(self, request):
        try:
            user = request.user
            if user.username == '':
                raise Exception("用户必须登录")
            userSerializer = UserSerializer(user)
        except Exception as e:
            # 未登录
            logger.warning("用户未登录，但尝试提交")
            logger.warning("warning %s", e)
            return Response("用户未登录！", status=status.HTTP_401_UNAUTHORIZED)
        userId = userSerializer.data['id']

        try:
            part_id = request.data['part_id']
            audio = request.data['audio']
            quesType = request.data['quesType']
        except Exception as e:
            logger.warning("参数错误")
            logger.warning("warning %s", e)
            return Response("数据验证未通过！需要part_id和audio字段！", status=status.HTTP_400_BAD_REQUEST)

        # 向SightsingingRecord中存储数据
        data = {'part_id': part_id, 'audio': audio, 'user': userId, 'ques_type': quesType}
        # 双声部需要添加合作者信息
        if part_id[2] == '3':
            data['coop_user'] = request.data['coopStudentInfo']['user']
        verify_data = SightsingingSerializer(data=data)
        if verify_data.is_valid():
            save = verify_data.save()
            recordId = SightsingingSerializer(instance=save).data['id']
        else:
            logger.warning("%s 向SightsingingRecord中存储数据失败", userSerializer.data['username'])
            return Response("数据验证未通过", status=status.HTTP_400_BAD_REQUEST)
        logger.info("%s 向SightsingingRecord中存储数据成功", userSerializer.data['username'])

        # 向quesGroup中存储数据
        title_text = {'1': '视唱-单声部精唱', '2': '视唱-单声部视谱即唱', '3': '视唱-双声部'}
        title = title_text[part_id[2]]
        data = {'group_part_id': part_id[:-2], 'group_title': title, 'lesson_No': part_id[-3], 'state': 0,
                'user': userId, 'record_id': recordId}
        # 双声部需要添加合作者信息
        if part_id[2] == '3':
            data['coop_user'] = request.data['coopStudentInfo']['user']

        verify_data = QuesGroupSerializer(data=data)
        if verify_data.is_valid():
            verify_data.save()
        else:
            logger.warning("%s 向quesGroup中存储数据失败", userSerializer.data['username'])
            return Response("数据验证未通过", status=status.HTTP_400_BAD_REQUEST)

        logger.info("%s 向quesGroup中存储数据成功", userSerializer.data['username'])
        # 开启异步转换mp3
        logger.info("开启异步转换MP3,recordId:%s audio:%s", recordId, audio)
        async_task('message_queue.tasks.convert_to_mp3', recordId, audio)

        return Response('上传作业成功', status=status.HTTP_200_OK)
        # 向quesGroup中存储数据


class ChoiceList(APIView):
    def get(self, request):
        return Response("接口未开放", status=status.HTTP_404_NOT_FOUND)

    def post(self, request):
        try:
            user = request.user
            if user.username == '':
                raise Exception("用户必须登录")
            userSerializer = UserSerializer(user)
        except Exception as e:
            # 未登录
            logger.warning("用户未登录，但尝试提交")
            logger.warning("warning %s", e)
            return Response("用户未登录！", status=status.HTTP_401_UNAUTHORIZED)
        userId = userSerializer.data['id']
        sumScore = 0
        try:
            answerInfo = request.data['answerInfo']
            lesson_No = request.data['lesson_No']
            groupPart_id = request.data['groupPart_id']
        except Exception as e:
            logger.warning("请求参数错误")
            logger.warning("warning %s", e)
            return Response("数据验证未通过！需要answerInfo、lesson_No和groupPart_id字段！", status=status.HTTP_400_BAD_REQUEST)
        # 向choiceRecord中存储数据
        for ques in answerInfo:
            try:
                part_id = ques['part_id']
                userAnswer = ques['userAnswer']
            except:
                return Response("数据验证未通过！需要part_id和userAnswer字段！", status=status.HTTP_400_BAD_REQUEST)
            quesDetail = ChoiceQuestion.objects.get(part_id=part_id)
            quesDetailSerialized = ChoiceInfo(quesDetail)
            score = quesDetailSerialized.data['score'] \
                if quesDetailSerialized.data['choice_ans'].lower() == userAnswer else 0
            sumScore += score
            data = {'part_id': part_id, 'response': userAnswer, 'score': score, 'user': userId}
            verify_data = ChoiceSerializer(data=data)
            if verify_data.is_valid():
                verify_data.save()
            else:
                logger.warning("%s 向choiceRecord中存储数据失败", userSerializer.data['username'])
                return Response("数据验证未通过", status=status.HTTP_400_BAD_REQUEST)
        logger.info("%s 向choiceRecord中存储数据成功", userSerializer.data['username'])

        # 向quesGroup中存储数据
        quesDetail = ChoiceQuestion.objects.get(part_id=groupPart_id + '01')
        quesDetailSerialized = ChoiceInfo(quesDetail)
        title_text = {'0': '视唱', '3': '练耳选择题', '4': '练耳听写题'}
        title = title_text[groupPart_id[0]] + '-' + quesDetailSerialized.data['part_name']
        data = {'group_part_id': groupPart_id, 'group_title': title, 'lesson_No': lesson_No, 'state': 0,
                'computer_score': sumScore, 'teacher_score': sumScore, 'user': userId}

        verify_data = QuesGroupSerializer(data=data)
        if verify_data.is_valid():
            verify_data.save()
        else:
            logger.warning("%s 向quesGroup中存储数据失败", userSerializer.data['username'])
            return Response("数据验证未通过", status=status.HTTP_400_BAD_REQUEST)
        logger.info("%s 向quesGroup中存储数据成功", userSerializer.data['username'])
        return Response('上传作业成功', status=status.HTTP_200_OK)


class DictationList(APIView):
    def get(self, request):
        return Response("接口未开放", status=status.HTTP_404_NOT_FOUND)

    def post(self, request):
        try:
            user = request.user
            if user.username == '':
                raise Exception("用户必须登录")
            userSerializer = UserSerializer(user)
        except Exception as e:
            # 未登录
            logger.warning("用户未登录，但尝试提交")
            logger.warning("warning %s", e)
            return Response("用户未登录！", status=status.HTTP_401_UNAUTHORIZED)
        userId = userSerializer.data['id']
        try:
            field = request.data['field']
            groupPart_id = request.data['groupPart_id']
            lesson_No = request.data['lesson_No']
        except Exception as e:
            logger.warning("参数错误")
            logger.warning("warning %s", e)
            return Response("数据验证未通过！field、lesson_No和groupPart_id字段！", status=status.HTTP_400_BAD_REQUEST)

        # 向choiceRecord中存储数据
        for ques in field:
            try:
                part_id = ques['part_id']
                json_field = ques['json']
                png_field = ques['png']
            except Exception as e:
                logger.warning("参数错误")
                logger.warning("warning %s", e)
                return Response("数据验证未通过！需要part_id和json字段！", status=status.HTTP_400_BAD_REQUEST)
            data = {'part_id': part_id, 'json_field': json_field, 'png_field': png_field, 'user': userId}
            verify_data = DictationSerializer(data=data)
            if verify_data.is_valid():
                verify_data.save()
            else:
                logger.warning("%s 向choiceRecord存储数据失败", userSerializer.data['username'])
                return Response("数据验证未通过", status=status.HTTP_400_BAD_REQUEST)
        logger.info("%s 向choiceRecord存储数据成功", userSerializer.data['username'])
        # 向quesGroup中存储数据
        quesDetail = DictationQuestion.objects.get(part_id=groupPart_id + '01')
        quesDetailSerialized = DictationInfo(quesDetail)
        title_text = {'0': '视唱', '3': '练耳选择题', '4': '练耳听写题'}
        title = title_text[groupPart_id[0]] + '-' + quesDetailSerialized.data['part_name']
        data = {'group_part_id': groupPart_id, 'group_title': title, 'lesson_No': lesson_No, 'state': 0,
                'user': userId}

        verify_data = QuesGroupSerializer(data=data)
        if verify_data.is_valid():
            verify_data.save()
        else:
            logger.warning("%s 向quesGroup中存储数据失败", userSerializer.data['username'])
            return Response("数据验证未通过", status=status.HTTP_400_BAD_REQUEST)
        logger.info("%s 向quesGroup中存储数据成功", userSerializer.data['username'])
        return Response('上传作业成功', status=status.HTTP_200_OK)


class QuesGroupList(APIView):
    def get(self, request):
        try:
            user = request.user
            if user.username == '':
                raise Exception("用户必须登录")
            userSerializer = UserSerializer(user)
            userId = request.query_params['userId']
            lesson_No = request.query_params['lesson_No']
            grade = request.query_params['grade']
        except Exception as e:
            # 未登录
            logger.warning("用户未登录，但尝试提交")
            logger.warning("warning %s", e)
            return Response("用户未登录！", status=status.HTTP_401_UNAUTHORIZED)
        stateText = ['正常提交', '后期补交']
        stateType = ['check-circle', 'clock-circle']
        group_end_with = grade + '0' + lesson_No
        QuesList = QuesGroupRecord.objects.filter(group_part_id__endswith=group_end_with).filter(
            Q(user=userId) | Q(coop_user=userId)).order_by('-record_time')
        serializer = QuesGroupSerializer(QuesList, many=True)
        data = []
        for ques in serializer.data:
            ques['stateText'] = stateText[ques['state']]
            ques['stateType'] = stateType[ques['state']]
            data.append(ques)

        # 返回 Json 数据
        return Response({'result': data})


# 音频类
class AudioViewSet(viewsets.ModelViewSet):
    queryset = Audio.objects.all()
    serializer_class = AudioSerializer


# json类
class JsonViewSet(viewsets.ModelViewSet):
    queryset = Json.objects.all()
    serializer_class = JsonSerializer


# png类
class PngViewSet(viewsets.ModelViewSet):
    queryset = Png.objects.all()
    serializer_class = PngSerializer
