from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

from manager.views import getDeadline, getValidLessons, getLesson_No

from user.models import Student, Teacher, Class, Course
from django.contrib.auth.models import User, Group
from django.contrib.auth import authenticate, login, logout
from user.serializers import StudentSerializer, TeacherSerializer, CourseSerializer, ClassSerializer, UserSerializer
from user.permissions import IsAdminUserOrReadOnly

from solfeggio_django.settings import SECRET_KEY
import hashlib


# 获取学生课程信息
def getCourseInfo(student_id):
    userInfo = Student.objects.get(id=student_id)
    serializer = StudentSerializer(userInfo)
    # 课程默认每个学生一学期只能修一门课
    courseName = Course.objects.get(id=serializer.data['course'][0])
    courseSerializer = CourseSerializer(courseName)
    return courseSerializer.data


# 获取学生信息
def getStudentInfo(user_id):
    userInfo = Student.objects.get(user=user_id)
    serializer = StudentSerializer(userInfo)
    return serializer.data


class UserList(APIView):

    def get(self, request):
        user = Student.objects.all()
        serializer = StudentSerializer(user, many=True)
        # 返回 Json 数据
        return Response(serializer.data)


class UserInfo(APIView):

    def get(self, request):
        try:
            user = request.user
            if user.username == '':
                raise Exception("用户必须登录")
            userSerializer = UserSerializer(user)
        except:
            # 未登录
            return Response("用户未登录！", status=status.HTTP_401_UNAUTHORIZED)

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
            data['is_superuser'] = userSerializer.data['is_superuser']
            data['className'] = classSerializer.data['name']
            data['curriculumName'] = courseSerializer.data['name']
            data['course'] = courseSerializer.data
            # 目前版本的权限并未进行设置
            data['roleId'] = 'student'
            data['role'] = {'id': 'student', 'name': '学生', 'describe': '拥有所有权限', 'status': 1,
                            'creatorId': 'system',
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
            data['avatar'] = data['avatar']
            data['lesson_No'] = str(getLesson_No())
            data['lesson_deadline'] = getDeadline()
            data['vailLessons'] = getValidLessons(serializer.data['id'])
            response = {'result': data}

        # 返回 Json 数据
        return Response(response)

    def put(self, request):
        try:
            user = request.user
            if user.username == '':
                raise Exception("用户必须登录")
            userSerializer = UserSerializer(user)
        except:
            # 未登录
            return Response("用户未登录！", status=status.HTTP_401_UNAUTHORIZED)
        userInfo = Student.objects.get(user=userSerializer.data['id'])
        serializer = StudentSerializer(userInfo)
        info = serializer.data
        info.update(request.data)
        verify_data = StudentSerializer(instance=userInfo, data=info)
        # 验证提交的数据是否合法
        # 不合法则返回400

        if verify_data.is_valid():
            # 序列化器将持有的数据反序列化后，
            # 保存到数据库中
            verify_data.save()
            return Response(verify_data.data, status=status.HTTP_200_OK)
        print(verify_data.errors)
        return Response(verify_data.errors, status=status.HTTP_400_BAD_REQUEST)

    def post(self, request):
        studentId = request.data['studentId']
        newPassword = request.data['newPassword']
        user = User.objects.create_user(studentId, password=newPassword)
        stuGroup = Group.objects.get(id=2)
        user.groups.add(stuGroup)
        user.save()

        userInfo = Student.objects.get(id=studentId)
        stuInfo = StudentSerializer(userInfo)
        info = stuInfo.data
        info.update({'user': user.id})
        verify_data = StudentSerializer(instance=userInfo, data=info)
        # 验证提交的数据是否合法
        # 不合法则返回400

        if verify_data.is_valid():
            # 序列化器将持有的数据反序列化后，
            # 保存到数据库中
            verify_data.save()
            return Response('设置密码成功', status=status.HTTP_200_OK)
        print(verify_data.errors)
        return Response('设置密码失败', status=status.HTTP_400_BAD_REQUEST)


class StudentInfo(APIView):
    def get(self, request):
        try:
            user = request.user
            if user.username == '':
                raise Exception("用户必须登录")
            userSerializer = UserSerializer(user)
        except:
            # 未登录
            return Response("用户未登录！", status=status.HTTP_401_UNAUTHORIZED)
        studentId = request.query_params['studentId']
        courseId = request.query_params['courseId']
        userInfo = Student.objects.filter(id=studentId, course=courseId).first()
        if userInfo is None:
            return Response('未搜索到学生，请核对学号是否正确！', status=status.HTTP_400_BAD_REQUEST)
        serializer = StudentSerializer(userInfo)
        response = {'result': serializer.data}
        # 返回 Json 数据
        return Response(response)


class UserNav(APIView):
    permission_classes = [IsAdminUserOrReadOnly]

    def get(self, request):
        try:
            user = request.user
            if user.username == '':
                raise Exception("用户必须登录")
            userSerializer = UserSerializer(user)
        except:
            # 未登录
            return Response("用户未登录！", status=status.HTTP_401_UNAUTHORIZED)

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
                        'show': False,
                    },
                    'component': 'DictationList',
                },
                # {
                #     'name': 'management',
                #     'parentId': 0,
                #     'id': 300,
                #     'meta': {
                #         'icon': 'team',
                #         'title': '学生管理',
                #         'show': True,
                #     },
                #     'component': 'StudentList',
                # },
                #
                # {
                #     'name': 'workbench',
                #     'parentId': 0,
                #     'id': 400,
                #     'meta': {
                #         'icon': 'form',
                #         'title': '作业空间',
                #         'show': True,
                #     },
                #     'component': 'Workbench',
                # },
                #

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
                        'title': '学习空间',
                        'icon': 'book',
                        'show': False,
                    },
                    'redirect': '/study/sightsing-list',
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
                {
                    'name': 'Result',
                    'parentId': 0,
                    'id': 900,
                    'meta': {
                        'title': '作业详情',
                        'icon': 'book',
                        'show': False,
                    },
                    'redirect': '/account/center',
                    'component': 'RouteView',
                },
                {
                    'name': 'choice-result',
                    'parentId': 900,
                    'id': 901,
                    'meta': {
                        'title': '选择题结果',
                        'show': False,
                    },
                    'component': 'ChoiceResult',
                },
                {
                    'name': 'sightsing-result',
                    'parentId': 900,
                    'id': 902,
                    'meta': {
                        'title': '视唱结果',
                        'show': False,
                    },
                    'component': 'SightsingResult',
                },
                {
                    'name': 'dictation-result',
                    'parentId': 900,
                    'id': 903,
                    'meta': {
                        'title': '听写题结果',
                        'show': False,
                    },
                    'component': 'DictationResult',
                },

            ]
            if userSerializer.data['is_superuser']:
                nav.insert(5,
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
                           }, )
            response = {'result': nav}

        # 返回 Json 数据
        return Response(response)


class Logout(APIView):
    def post(self, request):
        try:
            user = request.user
            if user.username == '':
                raise Exception("用户必须登录")
            userSerializer = UserSerializer(user)
        except:
            # 未登录
            return Response("用户未登录！", status=status.HTTP_401_UNAUTHORIZED)
        return Response('退出登录成功', status=status.HTTP_200_OK)


class ChangePass(APIView):
    def post(self, request):
        try:
            user = request.user
            if user.username == '':
                raise Exception("用户必须登录")
            userSerializer = UserSerializer(user)
        except:
            # 未登录
            return Response("用户未登录！", status=status.HTTP_401_UNAUTHORIZED)
        password = request.data['password']
        new_password = request.data['newPassword']
        auth = authenticate(username=user.username, password=password)
        print(user.username)
        print(auth)
        if auth is not None:
            u = User.objects.get(username=user.username)
            u.set_password(new_password)
            u.save()
            # 重定向到一个页面
            return Response('设置密码成功', status=status.HTTP_200_OK)
        else:
            return Response('设置密码失败：原密码错误！', status=status.HTTP_403_FORBIDDEN)


class VerifyMd5(APIView):
    def post(self, request):
        studentId = request.data['studentId']
        verificationCode = request.data['verificationCode']
        # 注意这里filter返回的数组，与get不同
        userInfo = Student.objects.filter(id=studentId)
        if len(userInfo) == 0:
            return Response('学号不存在！', status=status.HTTP_400_BAD_REQUEST)
        else:
            studentInfo = StudentSerializer(userInfo[0])
            if studentInfo.data['user'] is not None:
                return Response('用户已经激活，请使用学号密码进行登录', status=status.HTTP_400_BAD_REQUEST)

            hl = hashlib.md5()
            hl.update((studentId + '$' + SECRET_KEY).encode("utf-8"))

            print(hl.hexdigest()[:5])
            if verificationCode == hl.hexdigest()[:5]:
                return Response('验证码验证通过，请设置账号密码', status=status.HTTP_200_OK)
            else:
                return Response('验证码不正确，请仔细核对！', status=status.HTTP_400_BAD_REQUEST)
