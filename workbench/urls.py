from django.urls import path
from workbench import views

app_name = 'workbench'

urlpatterns = [
    path('sing_detail/', views.SingDetail.as_view(), name='singDetail'),
    path('commit_info/', views.CommitInfo.as_view(), name='commitInfo'),
    path('sing_record/', views.SingRecord.as_view(), name='singRecord'),

]
