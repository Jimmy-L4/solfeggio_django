from django.urls import path
from user import views

app_name = 'user'

urlpatterns = [
    path('', views.UserList.as_view(), name='userList'),
    path('userinfo/', views.UserInfo.as_view(), name='userInfo'),
    path('nav/', views.UserNav.as_view(), name='userNav'),
]
