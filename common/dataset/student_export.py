import hashlib
import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'solfeggio_django.settings')
django.setup()

import xlrd, xlwt
from user.models import Student, Teacher, Class, Course
from user.serializers import StudentSerializer, TeacherSerializer, CourseSerializer, ClassSerializer, UserSerializer
from solfeggio_django.settings import SECRET_KEY


def get_classList():
    classObjects = Class.objects.all()
    classList = ClassSerializer(classObjects, many=True).data
    # print(classList)
    return classList


def get_studentList(classId):
    studentObject = Student.objects.filter(my_class=classId)
    studentList = StudentSerializer(studentObject, many=True).data
    print(len(studentList))
    return studentList


def get_verificationCode(studentId):
    hl = hashlib.md5()
    hl.update((str(studentId) + '$' + SECRET_KEY).encode("utf-8"))
    # print(hl.hexdigest()[:5])
    return hl.hexdigest()[:5]


def write_excel(sheet, studentList):
    worksheet = workbook.add_sheet(sheet)
    # 行 列 内容
    worksheet.write(0, 0, label='学生')
    worksheet.write(0, 1, label='学号')
    worksheet.write(0, 2, label='验证码')
    for i in range(len(studentList)):
        worksheet.write(i + 1, 0, label=studentList[i]['name'])
        worksheet.write(i + 1, 1, label=studentList[i]['id'])
        worksheet.write(i + 1, 2, label=get_verificationCode(studentList[i]['id']))


if __name__ == '__main__':
    # main函数中的参数默认为全局变量
    path = r'excel'
    # 创建一个worksheet
    workbook = xlwt.Workbook(encoding='utf-8')

    classes = get_classList()
    for item in classes:
        students = get_studentList(item['id'])
        write_excel(item['name'], students)

    # 保存
    workbook.save(os.path.join(path, '学生验证码.xls'))
