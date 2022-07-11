from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status, viewsets

from homework.models import SightsingingRecord, ChoiceRecord, DictationRecord, Audio, Json, Png
from homework.serializers import SightsingingSerializer, ChoiceSerializer, DictationSerializer, AudioSerializer, \
    JsonSerializer, PngSerializer


class SightsingList(APIView):
    def get(self, request):
        user = SightsingingRecord.objects.all()
        serializer = SightsingingSerializer(user, many=True)
        # 返回 Json 数据
        return Response(serializer.data)


class ChoiceList(APIView):
    def get(self, request):
        user = ChoiceRecord.objects.all()
        serializer = ChoiceSerializer(user, many=True)
        # 返回 Json 数据
        return Response(serializer.data)


class DictationList(APIView):
    def get(self, request):
        user = DictationRecord.objects.all()
        serializer = DictationSerializer(user, many=True)
        # 返回 Json 数据
        return Response(serializer.data)


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
