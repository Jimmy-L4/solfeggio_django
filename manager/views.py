import datetime

# 学习开始时间(必须是星期一)
openingTime = datetime.datetime(2022, 7, 25)


# 根据学期开始日期计算课次
def getLesson_No():
    timeNow = datetime.datetime.now()
    year_week_num = 52
    week_end_year = timeNow.year
    week_start_year = openingTime.year

    weeks = (week_end_year - week_start_year) * year_week_num + int(timeNow.strftime("%W")) - int(
        openingTime.strftime("%W"))
    Lesson_No = weeks // 2 + 1
    if Lesson_No >= 8:
        Lesson_No = 8
    print(Lesson_No)
    return Lesson_No


def getDeadline():
    # 课次所用天数
    lessonDay = datetime.timedelta(days=(getLesson_No() - 1) * 14)
    # 当前课次的第一个周五中午12点截止
    deadline = openingTime + lessonDay + datetime.timedelta(days=5, hours=12)
    print(deadline)
    return deadline


def getValidLessons(student_id):
    # 先获取学生信息
    from user.views import getCourseInfo
    courseInfo = getCourseInfo(student_id)
    startDay = int(courseInfo['time'][1])
    validList = [0, 0, 0, 0, 0, 0, 0, 0]
    # 课次所用天数
    lesson_No = getLesson_No()
    lessonDay = datetime.timedelta(days=(lesson_No - 1) * 14)
    startLine = openingTime + lessonDay + datetime.timedelta(days=startDay - 1)
    for i in range(lesson_No - 1):
        validList[i] = -1

    if startLine <= datetime.datetime.now() <= getDeadline():
        validList[lesson_No - 1] = 1
    elif startLine > datetime.datetime.now():
        validList[lesson_No - 1] = 0
    else:
        validList[lesson_No - 1] = -1
    print(validList)

    return validList
