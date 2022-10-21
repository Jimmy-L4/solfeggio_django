import os

import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'solfeggio_django.settings')
django.setup()

import xlrd
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
        return id
    else:
        raise Exception("添加Teacher失败！", verify_data.errors)


def addClass(name):
    data = {'name': name}
    verify_data = ClassSerializer(data=data)
    if verify_data.is_valid():
        verify_data.save()
        return verify_data.data['id']
    else:
        raise Exception("添加Class失败！", verify_data.errors)


def addCourse(id, name, teacher, grade, time, classroom):
    data = {'id': id, 'name': name, 'teacher': teacher, 'grade': grade, 'time': time, 'classroom': classroom}
    verify_data = CourseSerializer(data=data)
    if verify_data.is_valid():
        verify_data.save()
        return id
    else:
        raise Exception("添加Course失败！", verify_data.errors)


def handleStudentList(studentsInfo, classId, courseId):
    # 因为学生和课程是多对多关系，所以给学生的课程信息应该是一个list
    courseId = [courseId]
    for student in studentsInfo:
        addStudent(*student, my_class=classId, course=courseId, avatar='/media/avatar/%s.png' % student[0])


def addStudent(id, name, gender, my_class, course, avatar):
    gender = 1 if gender == '男' else 0
    data = {'id': id, 'name': name, 'gender': gender, 'my_class': my_class, 'course': course, 'avatar': avatar}
    verify_data = StudentSerializer(data=data)
    if verify_data.is_valid():
        verify_data.save()
    else:
        raise Exception("添加Student失败！", verify_data.errors)


def readExcel(file):
    wb = xlrd.open_workbook(filename=file)  # 打开文件
    sheet = wb.sheet_by_index(0)  # 通过索引获取表格
    teacherInfo = sheet.row_values(7)[:2]
    classInfo = sheet.row_values(9)[:1]
    courseInfo = sheet.row_values(11)[:6]
    studentsInfo = []
    for row in range(13, sheet.nrows):
        studentsInfo.append(sheet.row_values(row)[1:4])
    print(len(studentsInfo))
    return teacherInfo, classInfo, courseInfo, studentsInfo


if __name__ == '__main__':
    path = r'excel'
    files = os.listdir(path)
    for file in files:
        teacherInfo, classInfo, courseInfo, studentsInfo = readExcel(os.path.join(path, file))
        teacherId = addTeacher(*teacherInfo)
        classId = addClass(*classInfo)
        courseId = addCourse(*courseInfo)
        print(teacherId, classId, courseId)
        handleStudentList(studentsInfo, classId, courseId)
