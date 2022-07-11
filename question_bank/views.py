from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status, viewsets

from question_bank.models import ChoiceQuestion
from question_bank.serializers import ChoiceSerializer


class ChoiceList(APIView):
    def get(self, request):
        part_id = request.GET.get('part_id')[:-1]
        user = ChoiceQuestion.objects.filter(part_id__startswith=part_id)
        serializer = ChoiceSerializer(user, many=True)
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
            data.append(body)

        # 返回 Json 数据
        return Response(data)
