from django.contrib import admin

from .models import Student, Teacher, Class, Course


class StudentUnderwriterAdmin(admin.ModelAdmin):
    # 需要显示的字段信息
    list_display = ('user', 'name', 'my_class')


class TeacherUnderwriterAdmin(admin.ModelAdmin):
    # 需要显示的字段信息
    list_display = ('user', 'name')


class ClassUnderwriterAdmin(admin.ModelAdmin):
    # 需要显示的字段信息
    list_display = ('name', 'teacher', 'course')


class CourseUnderwriterAdmin(admin.ModelAdmin):
    # 需要显示的字段信息
    list_display = ('name', 'teacher', 'grade')


admin.site.register(Student, StudentUnderwriterAdmin)
admin.site.register(Teacher, TeacherUnderwriterAdmin)
admin.site.register(Class, ClassUnderwriterAdmin)
admin.site.register(Course, CourseUnderwriterAdmin)
