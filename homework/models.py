from django.contrib.auth.models import User
from django.db import models
from django.utils import timezone

from user.models import Student


# 视唱作业
class SightsingingRecord(models.Model):
    user = models.ForeignKey(User, null=True, blank=True, on_delete=models.SET(0), related_name='sightsinging_user')
    coop_user = models.ForeignKey(User, null=True, blank=True, on_delete=models.SET(0), related_name='sightsinging_coopUser')
    ques_type = models.IntegerField(null=True, blank=True)
    part_id = models.CharField(max_length=50)
    record_time = models.DateTimeField(default=timezone.now)
    audio = models.TextField()
    vice_audio = models.TextField(null=True, blank=True)
    merge_audio = models.TextField(null=True, blank=True)
    computer_score = models.IntegerField(null=True, blank=True)
    teacher_score = models.IntegerField(null=True, blank=True)
    fluency = models.IntegerField(null=True, blank=True)
    speed = models.IntegerField(null=True, blank=True)
    rhythm = models.IntegerField(null=True, blank=True)
    alignment = models.IntegerField(null=True, blank=True)
    chord = models.IntegerField(null=True, blank=True)
    pitch = models.IntegerField(null=True, blank=True)

    def __str__(self):
        return self.part_id

    class Meta:
        verbose_name = '视唱作业记录表'
        verbose_name_plural = verbose_name


# 选择题作业
class ChoiceRecord(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET(0), related_name='choice_user')
    part_id = models.CharField(max_length=50)
    record_time = models.DateTimeField(default=timezone.now)
    response = models.CharField(max_length=5)
    score = models.IntegerField()

    def __str__(self):
        return self.part_id

    class Meta:
        verbose_name = '练耳选择题作业记录表'
        verbose_name_plural = verbose_name


# 听写题作业
class DictationRecord(models.Model):
    user = models.ForeignKey(User, null=True, blank=True, on_delete=models.SET(0), related_name='dictation_user')
    part_id = models.CharField(max_length=50)
    json_field = models.TextField(null=True, blank=True)
    png_field = models.TextField(null=True, blank=True)
    computer_score = models.IntegerField(null=True, blank=True)
    teacher_score = models.IntegerField(null=True, blank=True)
    record_time = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.part_id

    class Meta:
        verbose_name = '练耳听写题作业记录表'
        verbose_name_plural = verbose_name


# 题组列表
class QuesGroupRecord(models.Model):
    user = models.ForeignKey(User, null=True, blank=True, on_delete=models.SET(0), related_name='Ques_user')
    coop_user = models.ForeignKey(User, null=True, blank=True, on_delete=models.SET(0), related_name='Ques_coopUser')
    group_part_id = models.CharField(max_length=50)
    group_title = models.TextField()
    lesson_No = models.CharField(max_length=5)
    state = models.IntegerField()
    computer_score = models.IntegerField(null=True, blank=True)
    teacher_score = models.IntegerField(null=True, blank=True)
    record_time = models.DateTimeField(default=timezone.now)
    record_id = models.BigIntegerField(null=True, blank=True)

    def __str__(self):
        return self.group_part_id

    class Meta:
        verbose_name = '题组记录表'
        verbose_name_plural = verbose_name


def getFieldPath(instance, filename):
    if filename[-3:] == 'wav':
        return 'audio/%s/%s' % (instance.part_id, filename)
    elif filename[-4:] == 'json':
        return 'json/%s/%s' % (instance.part_id, filename)
    elif filename[-3:] == 'png':
        return 'png/%s/%s' % (instance.part_id, filename)
    else:
        return 'other/%s/%s' % (instance.part_id, filename)


class Audio(models.Model):
    user = models.ForeignKey(User, null=True, blank=True, on_delete=models.SET(0), related_name='audio_user')
    part_id = models.CharField(max_length=50)
    content = models.FileField(upload_to=getFieldPath)

    def __str__(self):
        return self.part_id

    class Meta:
        verbose_name = '音频记录表'
        verbose_name_plural = verbose_name


class Json(models.Model):
    user = models.ForeignKey(User, null=True, blank=True, on_delete=models.SET(0), related_name='json_user')
    part_id = models.CharField(max_length=50)
    content = models.FileField(upload_to=getFieldPath)

    def __str__(self):
        return self.part_id

    class Meta:
        verbose_name = 'json记录表'
        verbose_name_plural = verbose_name


class Png(models.Model):
    user = models.ForeignKey(User, null=True, blank=True, on_delete=models.SET(0), related_name='png_user')
    part_id = models.CharField(max_length=50)
    content = models.FileField(upload_to=getFieldPath)

    def __str__(self):
        return self.part_id

    class Meta:
        verbose_name = '图片记录表'
        verbose_name_plural = verbose_name
