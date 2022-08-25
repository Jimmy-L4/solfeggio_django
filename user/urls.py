from django.urls import path
from user import views

app_name = 'user'

urlpatterns = [
    path('', views.UserList.as_view(), name='userList'),
    path('logout/', views.Logout.as_view(), name='logout'),
    path('userinfo/', views.UserInfo.as_view(), name='userInfo'),
    path('student_info/', views.StudentInfo.as_view(), name='studentInfo'),
    path('nav/', views.UserNav.as_view(), name='userNav'),
]
