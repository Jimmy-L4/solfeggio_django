from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User


# 选择题题库
class ChoiceQuestion(models.Model):
    part_id = models.CharField(max_length=50)
    choice_ans = models.CharField(max_length=5)
    difficulty = models.CharField(max_length=5)
    extra_info = models.TextField(null=True)
    L_ques_txt = models.TextField()
    ques_txt = models.TextField()
    ques_audio_path = models.TextField()
    ques_xml_path = models.TextField(null=True)
    ques_pic_path = models.TextField(null=True)
    choice_rank = models.CharField(max_length=5)
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
