from django.contrib import admin

from homework.models import QuesGroupRecord, SightsingingRecord, ChoiceRecord, DictationRecord


# Register your models here.

class UnderwriterAdmin(admin.ModelAdmin):
    # 需要显示的字段信息
    list_display = ('id', 'user', 'part_id')
    search_fields = ('id', 'part_id', 'user__username')


class GroupUnderwriterAdmin(admin.ModelAdmin):
    # 需要显示的字段信息
    list_display = ('id', 'user', 'group_part_id')
    search_fields = ('id', 'group_part_id', 'user__username')


admin.site.register([SightsingingRecord, ChoiceRecord, DictationRecord], UnderwriterAdmin)
admin.site.register(QuesGroupRecord, GroupUnderwriterAdmin)
