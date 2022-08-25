from django.db import models
from django.utils import timezone
from django.contrib.auth.models import User


# 教师
class Teacher(models.Model):
    # 用户id(user的外键)
    user = models.ForeignKey(User, null=True, on_delete=models.SET(0), related_name='teacher_user')
    # 教工号
    id = models.CharField(max_length=100, primary_key=True)
    # 姓名
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


# 班级
class Class(models.Model):
    # 班级名称
    name = models.CharField(max_length=100)


# 课程
class Course(models.Model):
    id = models.CharField(max_length=100, primary_key=True)
    name = models.CharField(max_length=100)
    # 教师
    teacher = models.ForeignKey(Teacher, null=True, on_delete=models.SET(0), related_name='course_teacher')
    # 课程等级
    grade = models.CharField(max_length=10)
    # 课程时间
    time = models.CharField(max_length=50)
    # 课程地点
    classroom = models.CharField(max_length=50)

    def __str__(self):
        return self.name


# 学生
class Student(models.Model):
    # 用户id(user的外键)
    user = models.ForeignKey(User, null=True, on_delete=models.SET(0), related_name='student_user')
    # 学号
    id = models.BigIntegerField(primary_key=True)
    # 姓名
    name = models.CharField(max_length=100)
    # 班级(无法命名为class)
    my_class = models.ForeignKey(Class, null=True, on_delete=models.SET(0), related_name='student_class')
    # 课程
    course = models.ManyToManyField(Course, related_name='student_course')
    # 创建时间
    created = models.DateTimeField(default=timezone.now)
    # 头像
    avatar = models.TextField(null=True)
    # 是否开启节拍器自动播放
    metronome = models.BooleanField(default=False)

    def __str__(self):
        return self.name
