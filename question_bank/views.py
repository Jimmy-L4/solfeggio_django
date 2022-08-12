from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status, viewsets

from question_bank.models import ChoiceQuestion, SightsingingQuestion, AudioDetail
from question_bank.serializers import ChoiceSerializer, SightsingingSerializer, AudioDetailSerializer

from homework.models import QuesGroupRecord
from homework.serializers import QuesGroupSerializer
import random


# 获取题组状态
def GetState(group_part_id):
    quesList = QuesGroupRecord.objects.filter(group_part_id=group_part_id)
    if len(quesList):
        return 1
    return 0


# 视唱题列表
class SightsingingList(APIView):

    @staticmethod
    def get(request):
        lesson_No = request.query_params['lesson_No']
        grade = request.query_params['grade']
        quesList = SightsingingQuestion.objects.filter(lesson_No=lesson_No, part_rank=grade)
        serializer = SightsingingSerializer(quesList, many=True)
        data = serializer.data

        stateText = ['待完成', '已完成', '已逾期']
        stateType = ['clock-circle', 'check-circle', 'stop']
        quesDec = {'单声部精唱': '本道题为单声部视唱题目，学生需要根据乐谱唱出对应单声部曲目',
                   '单声部视谱即唱': '本道题为单声部视唱题目，学生需要根据乐谱唱出对应单声部曲目',
                   '双声部-低声部': '本道题为双声部视唱题目，学生需要根据乐谱同时配合范例音唱出对应低声部的部分',
                   '双声部-高声部': '本道题为双声部视唱题目，学生需要根据乐谱同时配合范例音唱出对应高声部的部分'}

        for index, ques in enumerate(data):
            audioInfo = AudioDetail.objects.get(part_id=ques['part_id'])
            audio_info = AudioDetailSerializer(audioInfo)
            ques['audio_detail'] = audio_info.data

            state = GetState(ques['part_id'][:-2])
            ques['stateText'] = stateText[state]
            ques['state'] = state
            ques['stateType'] = stateType[state]
            ques['description'] = quesDec[ques['part_name']]
            ques['note'] = 4
            ques['beat'] = 4
            ques['bpm'] = 70


            data[index] = ques

        return Response({'result': data})


# 练耳选择题列表
class ChoiceList(APIView):
    @staticmethod
    def get(request):
        lesson_No = request.query_params['lesson_No']
        grade = request.query_params['grade']
        quesList = ChoiceQuestion.objects.filter(lesson_No=lesson_No, choice_rank=grade)
        serializer = ChoiceSerializer(quesList, many=True)
        data = serializer.data

        stateText = ['待完成', '已完成', '已逾期']
        stateType = ['clock-circle', 'check-circle', 'stop']
        stateDec = ['题目待完成，快点击作答完成作业吧！',
                    '题目已经完成！点击作答查看题目详情，作业无法重复提交。',
                    '题目逾期未完成，点击作答查看题目详情，但无法提交。']
        quseType = {'一.音阶（每题3分，共18分）': {'num': 6, 'type': '一.音阶'},
                    '二.音组（每题5分，共10分）': {'num': 2, 'type': '二.音组'},
                    '三.音程（每题2分，共12分）': {'num': 6, 'type': '三.音程'},
                    '三.音程（音程听辨每题2分，音程连接6分，共12分）': {'num': 4, 'type': '三.音程'},
                    '三.和弦听辨（每题3分，共18分）': {'num': 6, 'type': '三.和弦听辨'},
                    '四.和弦（每题3分，共18分）': {'num': 6, 'type': '四.和弦'},
                    '四.和弦（和弦听辨每题3分，和弦连接6分，共18分）': {'num': 5, 'type': '四.和弦'},
                    '四.和弦连接（每题6分，共12分）': {'num': 2, 'type': '四.和弦连接'},
                    }
        response = []
        for index, ques in enumerate(data):
            state = GetState(ques['part_id'][:-2])
            quesInfo = {'id': ques['id'], 'part_id': ques['part_id'], 'stateText': stateText[state], 'state': state,
                        'stateType': stateType[state], 'stateDec': stateDec[state], 'sumScore': ques['L_ques_score']}
            if ques['L_ques_txt'] in quseType.keys():
                quesInfo['qusNum'] = quseType[ques['L_ques_txt']]['num']
                quesInfo['title'] = quseType[ques['L_ques_txt']]['type']
            else:
                quesInfo['qusNum'] = 1
                quesInfo['title'] = ques['L_ques_txt'].split('——')[0]
            response.append(quesInfo)

        return Response({'result': response})


# 选择题详情
class ChoiceDetail(APIView):

    @staticmethod
    def get(request):
        """
        重写get请求方法
        获取选择题一个题组下的所有题目，如音阶下的六道题

        :param request: 请求体
        :type request: django请求体
        :returns: 该题组下所有的题目
        :rtype: json
        :author Jimmy 2022/07/13
        """

        # 因为这里获取的是一组题目，不同小题的part_id不同，但只有最后一位num不同，这里采用startswith模糊查找
        part_id = request.query_params['part_id'][:-1]
        if part_id == '' or part_id is None:
            return Response("参数类型错误", status=status.HTTP_400_BAD_REQUEST)
        quesList = ChoiceQuestion.objects.filter(part_id__startswith=part_id)
        serializer = ChoiceSerializer(quesList, many=True)
        data = []
        for ques in serializer.data:
            answer = {}
            for i in ['a', 'b', 'c', 'd']:
                A = dict([(key, ques[i + '_' + key]) for key in ['pic_path', 'xml_path', 'audio_path', 'txt']])
                answer[i] = A
            body = dict([(key, ques[key]) for key in
                         ['part_id', 'choice_ans', 'ques_audio_path', 'ques_pic_path', 'ques_xml_path', 'L_ques_txt',
                          'ques_txt']])
            body['answer'] = answer
            body['userAnswer'] = -1
            body['note'] = 4
            body['beat'] = 4
            body['bpm'] = 70
            data.append(body)

        # 返回 Json 数据
        return Response(data)
