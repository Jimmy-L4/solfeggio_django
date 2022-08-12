from rest_framework import serializers
from homework.models import SightsingingRecord, ChoiceRecord, DictationRecord, QuesGroupRecord, Audio, Json, Png


class SightsingingSerializer(serializers.ModelSerializer):
    class Meta:
        model = SightsingingRecord
        fields = '__all__'


class ChoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChoiceRecord
        fields = '__all__'


class DictationSerializer(serializers.ModelSerializer):
    class Meta:
        model = DictationRecord
        fields = '__all__'


class QuesGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuesGroupRecord
        fields = '__all__'


class AudioSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name='audio-detail')

    class Meta:
        model = Audio
        fields = '__all__'


class JsonSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name='json-detail')

    class Meta:
        model = Json
        fields = '__all__'


class PngSerializer(serializers.ModelSerializer):
    url = serializers.HyperlinkedIdentityField(view_name='png-detail')

    class Meta:
        model = Png
        fields = '__all__'
