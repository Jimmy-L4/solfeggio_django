import datetime

# 学习开始时间（必须是星期一）
openingTime = datetime.datetime(2023, 10, 30)


# 根据学期开始日期计算课次
def getLesson_No():
    timeNow = datetime.datetime.now()
    year_week_num = 52
    week_end_year = timeNow.year
    week_start_year = openingTime.year

    weeks = (week_end_year - week_start_year) * year_week_num + int(timeNow.strftime("%W")) - int(
        openingTime.strftime("%W"))

    # Lesson_No = weeks // 2 + 1
    # 改变记录课次方式，改为一周一个课次
    Lesson_No = weeks + 1
    # 还没到开始时间
    if Lesson_No < 1:
        Lesson_No = 1
    # 结束了
    if Lesson_No >= 8:
        Lesson_No = 8
    return Lesson_No


def getDeadline():
    # 课次所用天数
    lessonDay = datetime.timedelta(days=(getLesson_No() - 1) * 7)
    # 当前课次的第一个周五中午12点截止
    deadline = openingTime + lessonDay + datetime.timedelta(days=4, hours=17)
    return deadline


def getValidLessons(student_id):
    # 甲方要求全部题目开放
    # return [1, 1, 1, 1, 1, 1, 1, 1]
    # 先获取学生信息
    from user.views import getCourseInfo
    courseInfo = getCourseInfo(student_id)
    validList = [1, 1, 1, 1, 1, 1, 1, 1]
    # 课次所用天数
    lesson_No = getLesson_No()
    lessonDay = datetime.timedelta(days=(lesson_No - 1) * 7)
    for i in range(lesson_No - 1):
        validList[i] = -1

    if datetime.datetime.now() > getDeadline():
        validList[lesson_No - 1] = -1
    validList[1] = 1

    return validList
