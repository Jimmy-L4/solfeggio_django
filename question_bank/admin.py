from django.contrib import admin

from question_bank.models import ChoiceQuestion, DictationQuestion, SightsingingQuestion, AudioDetail


class UnderwriterAdmin(admin.ModelAdmin):
    # 需要显示的字段信息
    list_display = ('part_id', 'part_name', 'lesson_No')
    search_fields = ('part_id',)


class AudioUnderwriterAdmin(admin.ModelAdmin):
    # 需要显示的字段信息
    list_display = ('part_id', 'audio_name')
    search_fields = ('part_id',)


# Register your models here.
admin.site.register([ChoiceQuestion, DictationQuestion, SightsingingQuestion], UnderwriterAdmin)
admin.site.register(AudioDetail, AudioUnderwriterAdmin)
