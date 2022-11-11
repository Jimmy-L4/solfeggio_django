import math

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
import json


# 获取学生课程信息
def getCourseInfo(student_id):
    userInfo = Student.objects.get(id=student_id)
    serializer = StudentSerializer(userInfo)
    # 课程默认每个学生一学期只能修一门课
    courseName = Course.objects.get(id=serializer.data['course'][0])
    courseSerializer = CourseSerializer(courseName)
    return courseSerializer.data


# 获取学生验证码
def getVerificationCode(student_id):
    hl = hashlib.md5()
    hl.update((str(student_id) + '$' + SECRET_KEY).encode("utf-8"))
    # print(hl.hexdigest()[:5])
    return hl.hexdigest()[:5]


# 获取学生信息
def getStudentInfo(user_id):
    user_info = Student.objects.get(user=user_id)
    serializer = StudentSerializer(user_info)
    return serializer.data


# 根据教师id返回教师负责的所有班级
def getMyClass(teacher_id):
    class_object = Class.objects.filter(teacher=teacher_id)
    class_list = ClassSerializer(class_object, many=True).data
    return class_list


# 读取json文件中的导航栏信息
def read_json_nav():
    with open('user/navigator.json', encoding='utf-8') as a:
        result = json.load(a)
        student_nav = result.get('student_nav')
        teacher_nav = result.get('teacher_nav')
    return student_nav, teacher_nav


class StudentList(APIView):

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
            # 获取参数
            pageNo = int(request.query_params['pageNo'])
            pageSize = int(request.query_params['pageSize'])
            # 查询单个学生
            if 'student_id' in request.query_params and request.query_params['student_id'] != '':
                student_id = request.query_params['student_id']
                student_object = Student.objects.filter(id=student_id)
                # 查询的学生不存在
                if not student_object.exists():
                    data = {'pageSize': pageSize, 'pageNo': pageNo, 'totalCount': 0, 'totalPage': 0, 'data': []}
                    return Response(data)
                student_info = StudentSerializer(student_object[0]).data
                class_id = student_info['my_class']
                class_info = ClassSerializer(Class.objects.get(id=class_id)).data
                class_name = class_info['name']
                course_info = getCourseInfo(student_id)
                grade = course_info['grade']
                course_name = course_info['name']
                data = [{'key': 1, 'studentId': student_id, 'studentName': student_info['name'], 'class': class_name,
                         'class_id': class_id, 'updatedAt': '20221103',
                         'status': 1 if student_info['user'] is not None else 2,
                         'grade': grade,
                         'courseName': course_name, 'verificationCode': getVerificationCode(student_id)}]
                result = {'pageSize': pageSize, 'pageNo': pageNo, 'totalCount': 1, 'totalPage': 1, 'data': data}
                return Response(result)

            # 查询一个班的学生
            if 'class_id' in request.query_params:
                class_id = int(request.query_params['class_id'])
            else:
                class_id = 1
            student_object = Student.objects.filter(my_class=class_id).order_by('id')
            student_info = StudentSerializer(student_object, many=True).data
            totalCount = len(student_info)
            # 班级名称
            class_object = Class.objects.filter(id=class_id)
            class_info = ClassSerializer(class_object[0]).data
            class_name = class_info['name']
            # 课程信息
            teacher_id = userSerializer.data['username']  # 得益于用户名与id相同,这个设计真是赞!
            course_object = Course.objects.filter(teacher=teacher_id)
            course_info = CourseSerializer(course_object[0]).data  # 一个班级下只会对应一个课程
            course_name = course_info['name']
            grade = course_info['grade']

            totalPage = math.ceil(totalCount / pageSize)
            key = (pageNo - 1) * pageSize
            # 返回数目
            top_index = totalCount % pageSize if pageNo >= totalPage and totalCount % pageSize != 0 else pageSize

            result = []
            for index in range(top_index):
                temp_index = key + index
                student = student_info[temp_index]
                data = {'key': temp_index}
                student_id = student['id']
                data['studentId'] = student_id
                data['studentName'] = student['name']
                data['class'] = class_name
                data['class_id'] = class_id
                data['updatedAt'] = '20221103'
                data['status'] = 1 if student['user'] is not None else 2
                data['grade'] = grade
                data['courseName'] = course_name
                data['verificationCode'] = getVerificationCode(student_id)
                result.append(data)

            response = {'pageSize': pageSize, 'pageNo': pageNo, 'totalCount': totalCount, 'totalPage': totalPage,
                        'data': result}

        return Response(response)


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
            teacher_id = serializer.data['id']
            course_object = Course.objects.filter(teacher=teacher_id)
            course_list = CourseSerializer(course_object, many=True).data
            data = serializer.data
            # 目前版本的权限并未进行设置
            data['roleId'] = 'teacher'
            data['role'] = {'id': 'teacher', 'name': '教师', 'describe': '拥有所有权限', 'status': 1,
                            'creatorId': 'system',
                            'createTime': 1497160610259, 'deleted': 0,
                            'permissions': [
                                {
                                    'roleId': 'teacher',
                                    'permissionId': 'teacher',
                                    'permissionName': '教师',
                                    'actions': '',
                                    'actionEntitySet': [],
                                    'actionList': 'null',
                                    'dataAccess': 'null',
                                },
                                {
                                    'roleId': 'teacher',
                                    'permissionId': 'result',
                                    'permissionName': '结果权限',
                                    'actions': '',
                                    'actionEntitySet': [],
                                    'actionList': 'null',
                                    'dataAccess': 'null',
                                },
                                {
                                    'roleId': 'teacher',
                                    'permissionId': 'exception',
                                    'permissionName': '异常页权限',
                                    'actions': '',
                                    'actionEntitySet': [],
                                    'actionList': 'null',
                                    'dataAccess': 'null',
                                },
                            ],
                            }
            data['lesson_No'] = str(getLesson_No())
            data['lesson_deadline'] = getDeadline()
            data['course_list'] = course_list
            data['class_list'] = getMyClass(teacher_id)
            response = {'result': data}

            # 返回 Json 数据

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
                                    'permissionId': 'student',
                                    'permissionName': '用户管理',
                                    'actions': '',
                                    'actionEntitySet': [],
                                    'actionList': 'null',
                                    'dataAccess': 'null',
                                },
                                {
                                    'roleId': 'student',
                                    'permissionId': 'result',
                                    'permissionName': '结果权限',
                                    'actions': '',
                                    'actionEntitySet': [],
                                    'actionList': 'null',
                                    'dataAccess': 'null',
                                },
                                {
                                    'roleId': 'student',
                                    'permissionId': 'exception',
                                    'permissionName': '异常页权限',
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
        classId = request.query_params['classId']
        if userSerializer.data['username'] in ['22710015', '22020389', '17020223',
                                               'solfeggio'] and studentId == '202204':
            userInfo = Student.objects.filter(id=studentId).first()
        else:
            userInfo = Student.objects.filter(id=studentId, my_class=classId).first()
        if userInfo is None:
            return Response('未搜索到学生，请核对学号是否正确!(合作学生需是同班同学)',
                            status=status.HTTP_400_BAD_REQUEST)
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
        # 获取导航信息
        student_nav, teacher_nav = read_json_nav()

        # 查看用户身份
        # 教师
        if userSerializer.data['groups'][0] == 1:
            response = {'result': teacher_nav}
        # 学生
        else:

            # 给管理员学生添加通知管理功能
            if userSerializer.data['is_superuser']:
                student_nav.insert(5,
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
            response = {'result': student_nav}

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

            code = getVerificationCode(studentId)
            if verificationCode == code:
                return Response('验证码验证通过，请设置账号密码', status=status.HTTP_200_OK)
            else:
                return Response('验证码不正确，请仔细核对！', status=status.HTTP_400_BAD_REQUEST)
