from django.urls import path
from question_bank import views

app_name = 'question_bank'

urlpatterns = [

    path('sightsinging_list/', views.SightsingingList.as_view(), name='SightsingingList'),
    path('sightsinging/', views.SightsingingDetail.as_view(), name='sightsingingDetail'),
    path('choice_list/', views.ChoiceList.as_view(), name='ChoiceList'),
    path('choice/', views.ChoiceDetail.as_view(), name='choiceDetail'),
    path('dictation_list/', views.DictationList.as_view(), name='DictationList'),
    path('dictation/', views.DictationDetail.as_view(), name='dictationDetail'),
]
