from django.urls import path
from notice import views

app_name = 'notice'

urlpatterns = [
    path('', views.NoticeList.as_view()),
]
