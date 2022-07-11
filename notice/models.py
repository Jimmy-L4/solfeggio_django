from django.db import models
from django.contrib.auth.models import User
from user.models import Class
from django.utils import timezone


# 通知model
class Notice(models.Model):
    # 标题
    title = models.CharField(max_length=100)
    # 正文
    content = models.TextField()
    # 面向班级
    classes = models.CharField(max_length=100)
    # 类型
    type = models.IntegerField()
    # 作者昵称、头像
    nickname = models.CharField(max_length=100, null=True)

    avatar = models.ImageField(upload_to='avatar/%Y%m%d', null=True)
    # 作者
    author = models.ForeignKey(User, null=True, on_delete=models.CASCADE, related_name='notices')
    # 创建时间
    created = models.DateTimeField(default=timezone.now)
    # 更新时间
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
