from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

from django.http import Http404

from user.models import Student, Teacher, Class, Course
from django.contrib.auth.models import User
from user.serializers import StudentSerializer, TeacherSerializer, CourseSerializer, ClassSerializer, UserSerializer
from user.permissions import IsAdminUserOrReadOnly


class UserList(APIView):

    def get(self, request):
        user = Student.objects.all()
        serializer = StudentSerializer(user, many=True)
        # 返回 Json 数据
        return Response(serializer.data)


class UserInfo(APIView):
    permission_classes = [IsAdminUserOrReadOnly]

    def get(self, request):
        try:
            user = request.user
            userSerializer = UserSerializer(user)
        except:
            # 未登录
            raise Http404

        # 查看用户身份
        # 教师
        if userSerializer.data['groups'][0] == 1:
            userInfo = Teacher.objects.get(user=userSerializer.data['id'])
            serializer = TeacherSerializer(userInfo)
        # 学生
        else:
            userInfo = Student.objects.get(user=userSerializer.data['id'])
            serializer = StudentSerializer(userInfo)
            className = Class.objects.get(id=serializer.data['my_class'])
            # 课程默认每个学生一学期只能修一门课
            courseName = Course.objects.get(id=serializer.data['course'][0])
            classSerializer = ClassSerializer(className)
            courseSerializer = CourseSerializer(courseName)
            data = serializer.data
            data['className'] = classSerializer.data['name']
            data['curriculumName'] = courseSerializer.data['name']
            # 目前版本的权限并未进行设置
            data['roleId'] = 'student'
            data['role'] = {'id': 'student', 'name': '学生', 'describe': '拥有所有权限', 'status': 1, 'creatorId': 'system',
                            'createTime': 1497160610259, 'deleted': 0,
                            'permissions': [
                                {
                                    'roleId': 'student',
                                    'permissionId': 'user',
                                    'permissionName': '用户管理',
                                    'actions': '',
                                    'actionEntitySet': [],
                                    'actionList': 'null',
                                    'dataAccess': 'null',
                                },
                            ],
                            }
            data['avatar'] = '/api' + data['avatar']
            response = {'result': data}

        # 返回 Json 数据
        return Response(response)


class UserNav(APIView):
    permission_classes = [IsAdminUserOrReadOnly]

    def get(self, request):
        try:
            user = request.user
            userSerializer = UserSerializer(user)
        except:
            # 未登录
            raise Http404

        # 查看用户身份
        # 教师
        if userSerializer.data['groups'][0] == 1:
            userInfo = Teacher.objects.get(user=userSerializer.data['id'])
            serializer = TeacherSerializer(userInfo)
        # 学生
        else:
            nav = [
                {
                    'name': 'home',
                    'parentId': 0,
                    'id': 100,
                    'meta': {
                        'icon': 'home',
                        'title': '主页',
                        'show': True,
                    },
                    'component': 'MyWorkplace',
                },
                {
                    'name': 'study',
                    'parentId': 0,
                    'id': 200,
                    'meta': {
                        'icon': 'book',
                        'title': '学习空间',
                        'show': True,
                    },
                    'redirect': '/study/sightsing-list',
                    'component': 'StudyLayout',
                },
                {
                    'name': 'sightsing-list',
                    'parentId': 200,
                    'id': 201,
                    'meta': {
                        'title': '视唱题目',
                        'show': True,
                    },
                    'component': 'SightsingList',
                },
                {
                    'name': 'choice-list',
                    'parentId': 200,
                    'id': 202,
                    'meta': {
                        'title': '练耳选择题',
                        'show': True,
                    },
                    'component': 'ChoiceList',
                },
                {
                    'name': 'dictation-list',
                    'parentId': 200,
                    'id': 203,
                    'meta': {
                        'title': '练耳听写题',
                        'show': True,
                    },
                    'component': 'DictationList',
                },
                {
                    'name': 'management',
                    'parentId': 0,
                    'id': 300,
                    'meta': {
                        'icon': 'team',
                        'title': '学生管理',
                        'show': True,
                    },
                    'component': 'StudentList',
                },

                {
                    'name': 'workbench',
                    'parentId': 0,
                    'id': 400,
                    'meta': {
                        'icon': 'form',
                        'title': '作业空间',
                        'show': True,
                    },
                    'component': 'Workbench',
                },

                {
                    'name': 'bulletinboard',
                    'parentId': 0,
                    'id': 500,
                    'meta': {
                        'icon': 'notification',
                        'title': '通知管理',
                        'show': True,
                    },
                    'component': 'BulletinBoard',
                },
                {
                    'name': 'account',
                    'parentId': 0,
                    'id': 600,
                    'meta': {
                        'title': '个人页面',
                        'icon': 'user',
                        'show': True,
                    },
                    'redirect': '/account/center',
                    'component': 'RouteView',
                },
                {
                    'name': 'center',
                    'parentId': 600,
                    'id': 601,
                    'meta': {
                        'title': '个人中心',
                        'show': True,
                    },
                    'component': 'AccountCenter',
                },
                {
                    'name': 'settings',
                    'parentId': 600,
                    'id': 602,
                    'meta': {
                        'title': '个人设置',
                        'hideHeader': True,
                        'hideChildren': True,
                        'show': True,
                    },
                    'redirect': '/account/settings/basic',
                    'component': 'AccountSettings',
                },
                {
                    'name': 'BasicSettings',
                    'path': '/account/settings/basic',
                    'parentId': 602,
                    'id': 6021,
                    'meta': {
                        'title': '基本设置',
                        'show': False,
                    },
                    'component': 'BasicSetting',
                },
                {
                    'name': 'NotificationSettings',
                    'path': '/account/settings/notification',
                    'parentId': 602,
                    'id': 6023,
                    'meta': {
                        'title': '新消息通知',
                        'show': False,
                    },
                    'component': 'NotificationSettings',
                },
                {
                    'name': 'answer',
                    'parentId': 0,
                    'id': 700,
                    'meta': {
                        'title': '答题空间',
                        'icon': 'book',
                        'show': False,
                    },
                    'redirect': '/answer/choice-layout',
                    'component': 'RouteView',
                },
                {
                    'name': 'choice',
                    'parentId': 700,
                    'id': 701,
                    'meta': {
                        'title': '选择题答题卡',
                        'show': False,
                    },
                    'component': 'ChoiceLayout',
                },
                {
                    'name': 'sightsing',
                    'parentId': 700,
                    'id': 702,
                    'meta': {
                        'title': '视唱答题卡',
                        'show': False,
                    },
                    'component': 'SightsingLayout',
                },
                {
                    'name': 'dictation',
                    'parentId': 700,
                    'id': 703,
                    'meta': {
                        'title': '听写题答题卡',
                        'show': False,
                    },
                    'component': 'DictationLayout',
                },
                {
                    'name': 'correcting',
                    'parentId': 0,
                    'id': 800,
                    'meta': {
                        'title': '批改作业',
                        'icon': 'form',
                        'show': False,
                    },
                    'component': 'Correcting',
                },

            ]
            response = {'result': nav}

        # 返回 Json 数据
        return Response(response)
