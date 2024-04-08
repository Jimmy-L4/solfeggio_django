import datetime
import logging

from manager.models import CourseConfig
from manager.serializers import CourseConfigSerializer

logger = logging.getLogger("django")


# 导入配置
def get_open_time():
    # 学习开始时间（必须是星期一）
    openingTime = datetime.datetime(2023, 10, 30)

    try:
        config_object = CourseConfig.objects.get(id=1)
        config = CourseConfigSerializer(config_object)
        openingTime = datetime.datetime.strptime(config.data['opening_time'], "%Y-%m-%d")
    except Exception as e:
        # 未登录
        logger.error("数据库读取开学时间配置错误")
        logger.error("error %s", e)
    return openingTime


def get_valid_list():
    valid_list = [False, False, False, False, False, False, False, False]
    try:
        config_object = CourseConfig.objects.get(id=1)
        config = CourseConfigSerializer(config_object)
        for i in range(8):
            if config.data[f'lesson_{i + 1}']:
                valid_list[i] = True
    except Exception as e:
        # 未登录
        logger.error("数据库读取课次开关配置错误")
        logger.error("error %s", e)
    return valid_list


# 根据学期开始日期计算课次
def getLesson_No():
    openingTime = get_open_time()
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
    openingTime = get_open_time()
    # 课次所用天数
    lessonDay = datetime.timedelta(days=(getLesson_No() - 1) * 7)
    # 当前课次的第一个周五中午12点截止
    deadline = openingTime + lessonDay + datetime.timedelta(days=4, hours=17)
    return deadline


def getValidLessons(student_id):
    valid_list_admin = get_valid_list()
    # 先获取学生信息
    validList = [1, 1, 1, 1, 1, 1, 1, 1]
    # 课次所用天数
    lesson_No = getLesson_No()
    for i in range(lesson_No - 1):
        validList[i] = -1

    if datetime.datetime.now() > getDeadline():
        validList[lesson_No - 1] = -1
    for i in range(8):
        if valid_list_admin[i]:
            validList[i] = 1

    return validList
