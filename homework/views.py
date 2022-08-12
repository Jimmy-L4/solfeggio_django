from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status, viewsets

from homework.models import SightsingingRecord, ChoiceRecord, DictationRecord, QuesGroupRecord, Audio, Json, Png
from homework.serializers import SightsingingSerializer, ChoiceSerializer, DictationSerializer, QuesGroupSerializer, \
    AudioSerializer, JsonSerializer, PngSerializer
# 用户
from user.serializers import UserSerializer
# 题库
from question_bank.models import ChoiceQuestion, SightsingingQuestion
from question_bank.serializers import ChoiceSerializer as ChoiceInfo
from question_bank.serializers import SightsingingSerializer as SightsingingInfo


class SightsingingList(APIView):

    def get(self, request):
        user = SightsingingRecord.objects.all()
        serializer = SightsingingSerializer(user, many=True)
        # 返回 Json 数据
        return Response(serializer.data)

    def post(self, request):
        try:
            user = request.user
            if user.username == '':
                raise Exception("用户必须登录")
            userSerializer = UserSerializer(user)
        except:
            # 未登录
            return Response("用户未登录！", status=status.HTTP_403_FORBIDDEN)
        userId = userSerializer.data['id']

        try:
            part_id = request.data['part_id']
            audio = request.data['audio']
        except:
            return Response("数据验证未通过！需要part_id和audio字段！", status=status.HTTP_400_BAD_REQUEST)
        # 向SightsingingRecord中存储数据
        data = {'part_id': part_id, 'audio': audio, 'user': userId}
        print(data)
        verify_data = SightsingingSerializer(data=data)
        if verify_data.is_valid():
            verify_data.save()
        else:
            print(verify_data.data)
            return Response("数据验证未通过", status=status.HTTP_400_BAD_REQUEST)
        print("log:向SightsingingRecord中存储数据成功")

        # 向quesGroup中存储数据
        quesDetail = SightsingingQuestion.objects.get(part_id=part_id)
        quesDetailSerialized = SightsingingInfo(quesDetail)
        title_text = {'0': '视唱', '3': '练耳选择题', '4': '练耳听写题'}
        title = title_text[part_id[0]] + '-' + quesDetailSerialized.data['part_name']
        data = {'group_part_id': part_id[:-2], 'group_title': title, 'lesson_No': part_id[-3], 'state': 0,
                'user': userId}

        verify_data = QuesGroupSerializer(data=data)
        if verify_data.is_valid():
            verify_data.save()
        else:
            return Response("数据验证未通过", status=status.HTTP_400_BAD_REQUEST)

        print('上传作业成功')
        return Response('上传作业成功', status=status.HTTP_200_OK)
        # 向quesGroup中存储数据


class ChoiceList(APIView):
    def get(self, request):
        user = ChoiceRecord.objects.all()
        serializer = ChoiceSerializer(user, many=True)
        # 返回 Json 数据
        return Response(serializer.data)

    def post(self, request):
        try:
            user = request.user
            if user.username == '':
                raise Exception("用户必须登录")
            userSerializer = UserSerializer(user)
        except:
            # 未登录
            return Response("用户未登录！", status=status.HTTP_403_FORBIDDEN)
        userId = userSerializer.data['id']
        sumScore = 0
        try:
            answerInfo = request.data['answerInfo']
            lesson_No = request.data['lesson_No']
            groupPart_id = request.data['groupPart_id']
        except:
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
                return Response("数据验证未通过", status=status.HTTP_400_BAD_REQUEST)
        print("log:向choiceRecord中存储数据成功")
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
            return Response("数据验证未通过", status=status.HTTP_400_BAD_REQUEST)
        print('上传作业成功')
        return Response('上传作业成功', status=status.HTTP_200_OK)


class DictationList(APIView):
    def get(self, request):
        user = DictationRecord.objects.all()
        serializer = DictationSerializer(user, many=True)
        # 返回 Json 数据
        return Response(serializer.data)


class QuesGroupList(APIView):
    def get(self, request):
        stateText = ['正常提交', '后期补交']
        stateType = ['check-circle', 'clock-circle']
        userId = request.query_params['userId']
        lesson_No = request.query_params['lesson_No']
        QuesList = QuesGroupRecord.objects.filter(user=userId, lesson_No=lesson_No).order_by('-record_time')
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
