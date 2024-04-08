from django.db import models


# 测试配置表
class CourseConfig(models.Model):
    # 标题
    title = models.CharField(max_length=100)
    # 正文
    content = models.TextField()
    # 开课时间
    opening_time = models.DateField()
    # 开放课次
    lesson_1 = models.BooleanField(default=False)
    lesson_2 = models.BooleanField(default=False)
    lesson_3 = models.BooleanField(default=False)
    lesson_4 = models.BooleanField(default=False)
    lesson_5 = models.BooleanField(default=False)
    lesson_6 = models.BooleanField(default=False)
    lesson_7 = models.BooleanField(default=False)
    lesson_8 = models.BooleanField(default=False)

    def __str__(self):
        return self.title
