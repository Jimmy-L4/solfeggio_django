from rest_framework import serializers
from manager.models import CourseConfig


class CourseConfigSerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseConfig
        fields = '__all__'
