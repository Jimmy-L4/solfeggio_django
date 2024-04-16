from django.contrib import admin

from common.utils.update_choice_scores import update_individual_scores, update_group_scores
from homework.models import QuesGroupRecord, SightsingingRecord, ChoiceRecord, DictationRecord


class ChoiceQuestionAdmin(admin.ModelAdmin):
    # 需要显示的字段信息
    list_display = ('id', 'user', 'part_id')
    search_fields = ('id', 'part_id', 'user__username')
    actions = ['update_scores_action']

    def update_scores_action(self, request, queryset):
        for question in queryset:
            update_individual_scores(question.part_id)
            update_group_scores(question.part_id[:-2])
        self.message_user(request, "已更新选定题目及其所在题组下所有学生的成绩。")

    update_scores_action.short_description = "重新计算所选择的part_id对应题目的学生成绩"


# Register your models here.

class UnderwriterAdmin(admin.ModelAdmin):
    # 需要显示的字段信息
    list_display = ('id', 'user', 'part_id')
    search_fields = ('id', 'part_id', 'user__username')


class GroupUnderwriterAdmin(admin.ModelAdmin):
    # 需要显示的字段信息
    list_display = ('id', 'user', 'group_part_id')
    search_fields = ('id', 'group_part_id', 'user__username')


admin.site.register([SightsingingRecord, DictationRecord], UnderwriterAdmin)
admin.site.register(ChoiceRecord, ChoiceQuestionAdmin)
admin.site.register(QuesGroupRecord, GroupUnderwriterAdmin)
