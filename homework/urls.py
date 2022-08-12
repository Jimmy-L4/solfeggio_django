from django.urls import path
from homework import views

app_name = 'homework'

urlpatterns = [
    path('sightsinging/', views.SightsingingList.as_view(), name='sightsinging'),
    path('choice/', views.ChoiceList.as_view(), name='choice'),
    path('dictation/', views.DictationList.as_view(), name='dictation'),
    path('quse_group/', views.QuesGroupList.as_view(), name='quesGroup'),
]
