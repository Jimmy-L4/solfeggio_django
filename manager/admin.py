from django.contrib import admin

from manager.models import CourseConfig


class UnderwriterAdmin(admin.ModelAdmin):
    # 需要显示的字段信息
    list_display = ('title', 'opening_time')


# Register your models here.
admin.site.register(CourseConfig, UnderwriterAdmin)
