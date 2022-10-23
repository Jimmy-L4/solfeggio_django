import os
from PIL import Image, ImageFont, ImageDraw
import random
import xlrd

import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'solfeggio_django.settings')
django.setup()
from user.models import Student, Teacher, Class, Course
from user.serializers import StudentSerializer, TeacherSerializer, CourseSerializer, ClassSerializer, UserSerializer


def addTeacher(id, name):
    teacher = Teacher.objects.filter(id=id)
    if teacher.exists():
        print("此教师已存在，无需重复添加")
        return id

    data = {'id': id, 'name': name}
    verify_data = TeacherSerializer(data=data)
    if verify_data.is_valid():
        verify_data.save()
        print('成功添加了教师:', name)
        return id
    else:
        raise Exception("添加Teacher失败！", verify_data.errors)


def addClass(name):
    classObject = Class.objects.filter(name=name)
    if classObject.exists():
        print("此班级已存在，无需重复添加")
        return ClassSerializer(classObject[0]).data['id']

    data = {'name': name}
    verify_data = ClassSerializer(data=data)
    if verify_data.is_valid():
        verify_data.save()
        print('成功添加了班级:', name)
        return verify_data.data['id']
    else:
        raise Exception("添加Class失败！", verify_data.errors)


def addCourse(id, name, teacher, grade, time, classroom):
    courseObject = Course.objects.filter(id=id)
    if courseObject.exists():
        print("此课程已存在，无需重复添加")
        return id

    data = {'id': id, 'name': name, 'teacher': teacher, 'grade': grade, 'time': time, 'classroom': classroom}
    verify_data = CourseSerializer(data=data)
    if verify_data.is_valid():
        verify_data.save()
        print('成功添加了课程:', name)
        return id
    else:
        raise Exception("添加Course失败！", verify_data.errors)


def handleStudentList(students_info, class_id, course_id):
    # 因为学生和课程是多对多关系，所以给学生的课程信息应该是一个list
    course_id = [course_id]
    for student in students_info:
        addStudent(*student, my_class=class_id, course=course_id, avatar='/media/avatar/%s.png' % student[0])


def createAvatar(text, studentId):
    # 对姓名进行截取，只取两个字
    if len(text) != 2:
        text = text[1:3]

    fontSize = 400
    liens = text.split('\n')
    # 画布颜色
    colors = ['#8139fd', '#00d6ba', '#fc9826', '#3b75fb']

    im = Image.new("RGB", (1000, 1000), colors[random.randint(0, 3)])
    dr = ImageDraw.Draw(im)

    fontPath = r"C:\Windows\Fonts\simhei.ttf"

    font = ImageFont.truetype(fontPath, fontSize)
    # 文字颜色
    dr.text((100, 300), text, font=font, fill="#FFFFFF")
    im.save(r'../../media/avatar/%s.png' % studentId)
    print('创建了', text, '的头像')


def addStudent(id, name, gender, my_class, course, avatar):
    studentObject = Student.objects.filter(id=id)
    if studentObject.exists():
        print("此学生已存在，无需重复添加")
        return

    gender = 1 if gender == '男' else 0
    data = {'id': id, 'name': name, 'gender': gender, 'my_class': my_class, 'course': course, 'avatar': avatar}
    verify_data = StudentSerializer(data=data)
    if verify_data.is_valid():
        verify_data.save()
        createAvatar(name, id)
        print('成功添加了学生:', name)
    else:
        raise Exception("添加Student失败！", verify_data.errors)


def readExcel(xlsFile):
    wb = xlrd.open_workbook(filename=xlsFile)  # 打开文件
    sheet = wb.sheet_by_index(0)  # 通过索引获取表格
    teacher_info = sheet.row_values(7)[:2]
    class_info = sheet.row_values(9)[:1]
    course_info = sheet.row_values(11)[:6]
    students_info = []
    for row in range(13, sheet.nrows):
        students_info.append(sheet.row_values(row)[1:4])
    print('文件中共有学生：', len(students_info), '名')
    return teacher_info, class_info, course_info, students_info


if __name__ == '__main__':
    path = r'excel/update'
    files = os.listdir(path)
    for file in files:
        teacherInfo, classInfo, courseInfo, studentsInfo = readExcel(os.path.join(path, file))
        teacherId = addTeacher(*teacherInfo)
        classId = addClass(*classInfo)
        courseId = addCourse(*courseInfo)
        print('教工号:', teacherId, '班级号:', classId, '课程号:', courseId)
        handleStudentList(studentsInfo, classId, courseId)
