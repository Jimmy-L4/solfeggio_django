from django.urls import path
from question_bank import views

app_name = 'question_bank'

urlpatterns = [
    path('choice/', views.ChoiceDetail.as_view(), name='choiceDetail'),
    path('sightsinging_list/', views.SightsingingList.as_view(), name='SightsingingList'),
    path('choice_list/', views.ChoiceList.as_view(), name='ChoiceList'),
]
