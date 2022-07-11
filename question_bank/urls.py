from django.urls import path
from question_bank import views

app_name = 'question_bank'

urlpatterns = [
    path('choice/', views.ChoiceList.as_view(), name='choiceInfo'),
]
