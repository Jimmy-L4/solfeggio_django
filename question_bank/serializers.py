from rest_framework import serializers
from question_bank.models import ChoiceQuestion, SightsingingQuestion, DictationQuestion, AudioDetail


class ChoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChoiceQuestion
        fields = '__all__'


class SightsingingSerializer(serializers.ModelSerializer):
    class Meta:
        model = SightsingingQuestion
        fields = '__all__'


class DictationSerializer(serializers.ModelSerializer):
    class Meta:
        model = DictationQuestion
        fields = '__all__'


class AudioDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = AudioDetail
        fields = '__all__'
