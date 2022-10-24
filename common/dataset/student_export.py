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
    worksheet.col(0).width = 256 * 24
    worksheet.col(1).width = 256 * 24
    worksheet.col(2).width = 256 * 24

    style = xlwt.XFStyle()  # 创建一个样式对象，初始化样式

    al = xlwt.Alignment()
    al.horz = 0x02  # 设置水平居中
    al.vert = 0x01  # 设置垂直居中
    style.alignment = al

    font = xlwt.Font()
    font.height = 20 * 18
    style.font = font

    borders = xlwt.Borders()
    # 细实线:1，小粗实线:2，细虚线:3，中细虚线:4，大粗实线:5，双线:6，细点虚线:7
    borders.left = 1
    borders.right = 1
    borders.top = 1
    borders.bottom = 1
    style.borders = borders

    # 行 列 内容
    style.font.bold = True
    worksheet.write(0, 0, '学生', style)
    worksheet.write(0, 1, '学号', style)
    worksheet.write(0, 2, '验证码', style)
    style.font.bold = False
    for i in range(len(studentList)):
        worksheet.write(i + 1, 0, studentList[i]['name'], style)
        worksheet.write(i + 1, 1, studentList[i]['id'], style)
        worksheet.write(i + 1, 2, get_verificationCode(studentList[i]['id']), style)


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
