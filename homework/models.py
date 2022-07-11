from django.db import models
from django.contrib.auth.models import User
from user.models import Student
from django.utils import timezone


# 视唱作业
class SightsingingRecord(models.Model):
    user = models.ForeignKey(User, null=True, on_delete=models.SET(0), related_name='sightsinging_user')
    part_id = models.CharField(max_length=50)
    record_time = models.DateTimeField(default=timezone.now)
    audio = models.FileField()
    vice_audio = models.FileField(null=True)
    merge_audio = models.FileField(null=True)
    computer_score = models.IntegerField(null=True)
    teacher_score = models.IntegerField(null=True)
    fluency = models.IntegerField(null=True)
    speed = models.IntegerField(null=True)
    rhythm = models.IntegerField(null=True)
    alignment = models.IntegerField(null=True)
    chord = models.IntegerField(null=True)

    def __str__(self):
        return self.part_id


# 选择题作业
class ChoiceRecord(models.Model):
    user = models.ForeignKey(User, null=True, on_delete=models.SET(0), related_name='choice_user')
    part_id = models.CharField(max_length=50)
    record_time = models.DateTimeField(default=timezone.now)
    response = models.CharField(max_length=5)
    score = models.IntegerField(null=True)

    def __str__(self):
        return self.part_id


# 听写题作业
class DictationRecord(models.Model):
    user = models.ForeignKey(User, null=True, on_delete=models.SET(0), related_name='dictation_user')
    part_id = models.CharField(max_length=50)
    json_field = models.FileField(null=True)
    png_field = models.FileField(null=True)
    computer_score = models.IntegerField(null=True)
    teacher_score = models.IntegerField(null=True)

    def __str__(self):
        return self.part_id


class Audio(models.Model):
    user = models.ForeignKey(User, null=True, on_delete=models.SET(0), related_name='audio_user')
    content = models.FileField(upload_to='audio/%Y%m%d')
    part_id = models.CharField(max_length=50)


class Json(models.Model):
    user = models.ForeignKey(User, null=True, on_delete=models.SET(0), related_name='json_user')
    content = models.FileField(upload_to='json/%Y%m%d')
    part_id = models.CharField(max_length=50)


class Png(models.Model):
    user = models.ForeignKey(User, null=True, on_delete=models.SET(0), related_name='png_user')
    content = models.FileField(upload_to='png/%Y%m%d')
    part_id = models.CharField(max_length=50)
