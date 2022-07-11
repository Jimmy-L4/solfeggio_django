from rest_framework import serializers
from question_bank.models import ChoiceQuestion


class ChoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChoiceQuestion
        fields = '__all__'
