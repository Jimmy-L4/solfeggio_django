import re

from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status, viewsets

from question_bank.models import ChoiceQuestion, SightsingingQuestion, DictationQuestion, AudioDetail
from question_bank.serializers import ChoiceSerializer, SightsingingSerializer, DictationSerializer, \
    AudioDetailSerializer

import random

# 用户
from user.serializers import UserSerializer
from user.views import getStudentInfo

from homework.views import GetState, GetChoiceInfo, GetDictationInfo, GetSightsingingInfo


# 根据范例音文件地址匹配节拍器速度
def getBpm(path):
    return int(re.split('_|.mp3', path)[-2])


# 视唱题列表
class SightsingingList(APIView):

    @staticmethod
    def get(request):
        try:
            user = request.user
            if user.username == '':
                raise Exception("用户必须登录")
            userSerializer = UserSerializer(user)
        except:
            # 未登录
            return Response("用户未登录！", status=status.HTTP_403_FORBIDDEN)
        userId = userSerializer.data['id']
        studentInfo = getStudentInfo(userId)

        lesson_No = request.query_params['lesson_No']
        grade = request.query_params['grade']
        quesList = SightsingingQuestion.objects.filter(lesson_No=lesson_No, part_rank=grade)
        serializer = SightsingingSerializer(quesList, many=True)
        data = serializer.data

        quesDec = {'单声部精唱': '本道题为单声部视唱题目，学生需要根据乐谱唱出对应单声部曲目',
                   '单声部视谱即唱': '本道题为单声部视唱题目，学生需要根据乐谱唱出对应单声部曲目',
                   '双声部': '本道题为双声部视唱题目，学生需要寻找另一名同学组队配合完成双声部题目的演唱'}

        for index, ques in enumerate(data):
            audioInfo = AudioDetail.objects.get(part_id=ques['part_id'])
            audio_info = AudioDetailSerializer(audioInfo)
            ques['audio_detail'] = audio_info.data

            state = GetState(ques['part_id'][:-2], userId, studentInfo['id'])
            ques['state'] = state
            ques['description'] = quesDec[ques['part_name']]
            ques['note'] = 4
            ques['beat'] = 4
            ques['bpm'] = int(ques['audio_path'][-6:-4])

            data[index] = ques

        return Response({'result': data})


# 视唱题详情
class SightsingingDetail(APIView):

    @staticmethod
    def get(request):
        try:
            user = request.user
            if user.username == '':
                raise Exception("用户必须登录")
            userSerializer = UserSerializer(user)
        except:
            # 未登录
            return Response("用户未登录！", status=status.HTTP_403_FORBIDDEN)
        userId = userSerializer.data['id']
        studentInfo = getStudentInfo(userId)

        part_id = request.query_params['part_id']
        recordId = request.query_params['recordId']
        ques = SightsingingQuestion.objects.get(part_id=part_id)
        serializer = SightsingingSerializer(ques)
        data = serializer.data

        audioInfo = AudioDetail.objects.get(part_id=data['part_id'])
        audio_info = AudioDetailSerializer(audioInfo)

        data['audio_detail'] = audio_info.data
        sightsingingInfo = GetSightsingingInfo(recordId)
        data['userAudio'] = sightsingingInfo['audio']
        data['score'] = sightsingingInfo['teacher_score']
        data['quesType'] = sightsingingInfo['ques_type']
        # 双声部需添加合作者信息
        if data['part_id'][2] == '3':
            StudentInfo = getStudentInfo(sightsingingInfo['user'])
            coopStudentInfo = getStudentInfo(sightsingingInfo['coop_user'])
            data['coop_user'] = coopStudentInfo['name']
            data['user'] = StudentInfo['name']

        state = GetState(data['part_id'][:-2], userId, studentInfo['id'])
        data['state'] = state
        data['note'] = 4
        data['beat'] = 4
        data['bpm'] = getBpm(data['audio_path'])

        return Response({'result': data})


# 练耳选择题列表
class ChoiceList(APIView):
    @staticmethod
    def get(request):
        try:
            user = request.user
            if user.username == '':
                raise Exception("用户必须登录")
            userSerializer = UserSerializer(user)
        except:
            # 未登录
            return Response("用户未登录！", status=status.HTTP_403_FORBIDDEN)
        userId = userSerializer.data['id']
        studentInfo = getStudentInfo(userId)

        lesson_No = request.query_params['lesson_No']
        grade = request.query_params['grade']
        quesList = ChoiceQuestion.objects.filter(lesson_No=lesson_No, choice_rank=grade)
        serializer = ChoiceSerializer(quesList, many=True)
        data = serializer.data

        stateDec = ['题目待完成，快点击作答完成作业吧！',
                    '题目已经完成！点击个人中心查看题目提交详情，作业无法重复提交。',
                    '题目逾期未完成，点击作答查看题目详情，但无法提交。',
                    '题目未开放，请等到课次开始再来作答!']
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
            state = GetState(ques['part_id'][:-2], userId, studentInfo['id'])
            quesInfo = {'id': ques['id'], 'part_id': ques['part_id'], 'state': state,
                        'stateDec': stateDec[state], 'sumScore': ques['L_ques_score']}
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
        try:
            user = request.user
            if user.username == '':
                raise Exception("用户必须登录")
            userSerializer = UserSerializer(user)
        except:
            # 未登录
            return Response("用户未登录！", status=status.HTTP_403_FORBIDDEN)
        userId = userSerializer.data['id']

        # 因为这里获取的是一组题目，不同小题的part_id不同，但只有最后一位num不同，这里采用startswith模糊查找
        part_id = request.query_params['part_id'][:-1]
        # 根据withAnswer判断是否返回用户提交信息
        withAnswer = request.query_params['withAnswer']
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
            if withAnswer == '1':
                body['userAnswer'], body['score'] = GetChoiceInfo(ques['part_id'], userId)
            else:
                body['userAnswer'] = -1
                body['score'] = 0

            body['note'] = 4
            body['beat'] = 4
            body['bpm'] = getBpm(ques['a_audio_path'])
            data.append(body)

        # 返回 Json 数据
        return Response(data)


# 练耳听写题列表
class DictationList(APIView):
    @staticmethod
    def get(request):
        try:
            user = request.user
            if user.username == '':
                raise Exception("用户必须登录")
            userSerializer = UserSerializer(user)
        except:
            # 未登录
            return Response("用户未登录！", status=status.HTTP_403_FORBIDDEN)
        userId = userSerializer.data['id']
        studentInfo = getStudentInfo(userId)

        lesson_No = request.query_params['lesson_No']
        grade = request.query_params['grade']
        quesList = DictationQuestion.objects.filter(lesson_No=lesson_No, choice_rank=grade)
        serializer = DictationSerializer(quesList, many=True)
        data = serializer.data

        stateDec = ['题目待完成，快点击作答完成作业吧！',
                    '题目已经完成！点击作答查看题目详情，作业无法重复提交。',
                    '题目逾期未完成，点击作答查看题目详情，但无法提交。',
                    '题目未开放，请等到课次开始再来作答!']
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
            state = GetState(ques['part_id'][:-2], userId, studentInfo['id'])
            quesInfo = {'id': ques['id'], 'part_id': ques['part_id'], 'state': state,
                        'stateDec': stateDec[state], 'sumScore': ques['L_ques_score']}
            if ques['L_ques_txt'] in quseType.keys():
                quesInfo['qusNum'] = quseType[ques['L_ques_txt']]['num']
                quesInfo['title'] = quseType[ques['L_ques_txt']]['type']
            else:
                quesInfo['qusNum'] = 1
                quesInfo['title'] = ques['L_ques_txt'].split('——')[0]
            response.append(quesInfo)

        return Response({'result': response})


# 听写题详情
class DictationDetail(APIView):

    @staticmethod
    def get(request):
        try:
            user = request.user
            if user.username == '':
                raise Exception("用户必须登录")
            userSerializer = UserSerializer(user)
        except:
            # 未登录
            return Response("用户未登录！", status=status.HTTP_403_FORBIDDEN)
        userId = userSerializer.data['id']

        # 因为这里获取的是一组题目，不同小题的part_id不同，但只有最后一位num不同，这里采用startswith模糊查找
        part_id = request.query_params['part_id'][:-1]
        if part_id == '' or part_id is None:
            return Response("参数类型错误", status=status.HTTP_400_BAD_REQUEST)
        # 根据withAnswer判断是否返回用户提交信息
        withAnswer = request.query_params['withAnswer']
        quesList = DictationQuestion.objects.filter(part_id__startswith=part_id)
        serializer = DictationSerializer(quesList, many=True)
        data = []
        for ques in serializer.data:
            answer = dict([(key, ques[key]) for key in ['a_pic_path', 'a_xml_path', 'a_audio_path', 'a_txt']])
            body = dict([(key, ques[key]) for key in
                         ['part_id', 'ques_audio_path', 'ques_pic_path', 'ques_xml_path', 'L_ques_txt',
                          'ques_txt']])
            body['answer'] = answer
            if withAnswer == '1':
                body['userAnswer'], body['score'] = GetDictationInfo(ques['part_id'], userId)
            else:
                body['userAnswer'] = -1
                body['score'] = 0
            body['note'] = 4
            body['beat'] = 4
            body['bpm'] = getBpm(ques['a_audio_path'])
            data.append(body)

        # 返回 Json 数据
        return Response(data)
