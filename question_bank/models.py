from django.contrib.auth.models import User
from django.db import models


# 选择题题库
class ChoiceQuestion(models.Model):
    part_id = models.CharField(max_length=50)
    choice_ans = models.CharField(max_length=5)
    difficulty = models.CharField(max_length=5)
    extra_info = models.TextField(null=True)
    L_ques_txt = models.TextField()
    L_ques_score = models.IntegerField(default=0)
    part_name = models.CharField(max_length=20)
    ques_txt = models.TextField()
    ques_audio_path = models.TextField()
    ques_xml_path = models.TextField(null=True)
    ques_pic_path = models.TextField(null=True)
    choice_rank = models.CharField(max_length=5)
    lesson_No = models.CharField(max_length=5, null=True)
    score = models.IntegerField()
    a_pic_path = models.TextField()
    a_xml_path = models.TextField()
    a_audio_path = models.TextField()
    a_txt = models.TextField(null=True)
    b_pic_path = models.TextField()
    b_xml_path = models.TextField()
    b_audio_path = models.TextField()
    b_txt = models.TextField(null=True)
    c_pic_path = models.TextField()
    c_xml_path = models.TextField()
    c_audio_path = models.TextField()
    c_txt = models.TextField(null=True)
    d_pic_path = models.TextField()
    d_xml_path = models.TextField()
    d_audio_path = models.TextField()
    d_txt = models.TextField(null=True)
    ques_audio_size = models.FloatField()

    def __str__(self):
        return self.part_id

    class Meta:
        verbose_name = '选择题题库'
        verbose_name_plural = verbose_name


# 听写题题库
class DictationQuestion(models.Model):
    part_id = models.CharField(max_length=50)
    choice_ans = models.CharField(max_length=5)
    extra_info = models.TextField(null=True)
    L_ques_txt = models.TextField()
    L_ques_score = models.IntegerField(default=0)
    part_name = models.CharField(max_length=20)
    ques_txt = models.TextField()
    ques_audio_path = models.TextField()
    ques_xml_path = models.TextField(null=True)
    ques_pic_path = models.TextField(null=True)
    choice_rank = models.CharField(max_length=5)
    lesson_No = models.CharField(max_length=5, null=True)
    score = models.IntegerField()
    a_pic_path = models.TextField()
    a_xml_path = models.TextField()
    a_audio_path = models.TextField()
    a_txt = models.TextField(null=True)
    ques_audio_size = models.FloatField()

    def __str__(self):
        return self.part_id

    class Meta:
        verbose_name = '听写题题库'
        verbose_name_plural = verbose_name


# 视唱题题库
class SightsingingQuestion(models.Model):
    part_id = models.CharField(max_length=50)
    part_name = models.CharField(max_length=20)
    part_rank = models.CharField(max_length=5)
    lesson_No = models.CharField(max_length=5)
    audio_path = models.TextField()
    pic_path = models.TextField()
    xml_path = models.TextField()
    audio_size = models.FloatField()

    def __str__(self):
        return self.part_id

    class Meta:
        verbose_name = '视唱题题库'
        verbose_name_plural = verbose_name


# 音频库
class AudioDetail(models.Model):
    part_id = models.CharField(max_length=50)
    audio_name = models.TextField(null=True)
    audio_player = models.TextField()
    audio_instrument = models.TextField()
    audio_nation = models.TextField(null=True)
    audio_skill = models.TextField(null=True)
    audio_size = models.FloatField()

    def __str__(self):
        return self.part_id

    class Meta:
        verbose_name = '音频库'
        verbose_name_plural = verbose_name
