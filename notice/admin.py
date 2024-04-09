from django.contrib import admin

from .models import Notice


class UnderwriterAdmin(admin.ModelAdmin):
    # 需要显示的字段信息
    list_display = ('title', 'nickname', 'updated')


admin.site.register(Notice, UnderwriterAdmin)
