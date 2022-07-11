from django.contrib import admin

from .models import Student, Teacher, Class, Course

# 注册ArticlePost到admin中
admin.site.register(Student)
admin.site.register(Teacher)
admin.site.register(Class)
admin.site.register(Course)
