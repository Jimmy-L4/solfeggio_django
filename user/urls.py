from django.urls import path
from user import views

app_name = 'user'

urlpatterns = [
    path('student_list/', views.StudentList.as_view(), name='studentlist'),
    path('logout/', views.Logout.as_view(), name='logout'),
    path('userinfo/', views.UserInfo.as_view(), name='userInfo'),
    path('student_info/', views.StudentInfo.as_view(), name='studentInfo'),
    path('nav/', views.UserNav.as_view(), name='userNav'),
    path('change_pass/', views.ChangePass.as_view(), name='changePass'),
    path('verify_code/', views.VerifyMd5.as_view(), name='verifyMd5'),


]
