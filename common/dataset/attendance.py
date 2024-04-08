# -*- encoding: utf-8 -*-
"""
@File    :   online_info_export.py   
@Contact :   licm@bupt.edu.cn
@License :   (C)Copyright Null
 
@Modify Time      @Author    @Version    @Description
------------      -------    --------    -----------
2023/12/21 18:15   Jimmy.li      1.0     导出学生在线时间
"""
import os
from datetime import timedelta

import pymysql
import xlwt

conn = pymysql.connect(
    host='62.234.135.208',
    user='root',
    passwd='Chuyanjihua_201821',
    db='solfeggio_django',
    port=3306,
    charset='utf8mb4'
)


def get_student(class_rank):
    student_list = []
    sql_select_stu = "select stu.user_id, stu.id, stu.name, cls.name from user_student stu " \
                     "left join user_class cls on cls.id=stu.my_class_id  " \
                     "left join user_course crs on cls.course_id=crs.id " \
                     "where crs.grade ='%s' and cls.name !='测试班级'  order by stu.user_id" % class_rank
    data_count = cursor.execute(sql_select_stu)
    data = cursor.fetchall()
    fields = cursor.description
    return data


def merge_and_format_dates(date_list):
    # 使用字典来存储每一天的时间点
    merged_dates = {}

    # 遍历输入的日期列表
    for date_obj in date_list:
        # 提取日期部分
        date_key = date_obj.date()

        # 如果日期已经在字典中，跳过当前元素
        if date_key in merged_dates:
            continue

        # 否则，将当前日期添加到字典中
        merged_dates[date_key] = date_obj

    # 将字典中的日期对象转换为特定格式的字符串
    result = [date.strftime('%Y-%m-%d-%H:%M') for date in merged_dates.values()]

    return result


def calculate_attendance(data_list):
    # 使用字典来存储每一天的时间点的最早和最晚时间
    attendance_times = {}

    # 遍历数据列表
    for date_obj in data_list:
        # 提取日期部分
        date_key = date_obj.date()

        # 如果日期已经在字典中，更新最早和最晚时间
        if date_key in attendance_times:
            earliest_time, latest_time = attendance_times[date_key]
            attendance_times[date_key] = (min(earliest_time, date_obj), max(latest_time, date_obj))
        else:
            # 否则，将当前日期添加到字典中
            attendance_times[date_key] = (date_obj, date_obj)

    # 计算每天的出勤时间
    attendance_duration = {}
    for date_key, (earliest_time, latest_time) in attendance_times.items():
        duration = latest_time - earliest_time
        attendance_duration[date_key] = duration.total_seconds() / 3600  # 转换为小时

    return attendance_duration


def calculate_active_time(update_times):
    active_time = timedelta(minutes=5)
    total_active_time = timedelta()

    # 对刺激时间序列进行排序
    sorted_times = sorted(update_times)
    if len(sorted_times) == 0:
        return 0
    current_time = sorted_times[0]
    start_time = current_time - active_time
    for update_time in sorted_times[1:]:
        if update_time - active_time < current_time:
            current_time = update_time
        else:
            total_active_time += current_time - start_time
            current_time = update_time
            start_time = current_time - active_time
    total_active_time += current_time - start_time

    return total_active_time.total_seconds() / 60


def get_score(data, difficulty):
    # 单声部精唱 单声部视谱即唱 双声部
    sing_score_sheet = []
    # 音阶 音组 音程 和弦 节奏 单声部旋律 双声部旋律
    ear_training_score_sheet = []
    attendance_data = []  # 存储所有出勤时间的列表
    for item in data:
        if item[4] is not None and item[0][-3] == difficulty[1]:
            group_part_id = item[0]
            question_type = int(group_part_id[2])
            lesson_No = int(item[1])
            # 视唱题目
            if group_part_id[0] == '0':
                sing_score_sheet.append(item[4])
                # 练耳题目
            else:
                sing_score_sheet.append(item[4])

            attendance_data.append(item[4])  # 将出勤时间添加到列表中

    # 计算出勤时间
    attendance_duration = calculate_active_time(attendance_data)

    sing_score_sheet = merge_and_format_dates(sing_score_sheet)

    return sing_score_sheet, attendance_duration


def solfeggio_traversal():
    difficulties = ["04"]
    sheet = workbook.add_sheet('学生成绩', cell_overwrite_ok=True)
    sheet.write(0, 0, '学号')
    sheet.write(0, 1, '姓名')
    sheet.write(0, 2, '班级')
    sheet.write(0, 3, '在线时长')  # 将平均在线时长列移到学生在线时间点列前面
    sheet.write(0, 4, '学生在线时间点')  # 将学生在线时间点列放在平均在线时长列后面
    for difficulty in difficulties:
        student_list = get_student('04')
        print("*" * 40 + '共有' + str(len(student_list)) + '名学生' + "*" * 40)
        for index, student in enumerate(student_list):
            print("*" * 40 + student[3] + ' —— ' + student[2] + "*" * 40)
            for j in range(3):
                sheet.write(index + 1, j, student[j + 1])
            if student[0] is not None:
                sql_select_stu = "select group_part_id, lesson_No, user_id, coop_user_id, record_time " \
                                 "from homework_quesgrouprecord " \
                                 "where user_id='%s' or coop_user_id='%s'" % (student[0], student[0])
                data_count = cursor.execute(sql_select_stu)
                data = cursor.fetchall()
                score_list, attendance_duration = get_score(data, difficulty)
                for j, score in enumerate(score_list):
                    sheet.write(index + 1, j + 4, str(score))

                    # 计算平均在线时长
                sheet.write(index + 1, 3, attendance_duration)
                # if attendance_duration:  # 检查字典是否为空
                #     total_attendance_time = sum(attendance_duration.values())  # 计算总在线时长
                #     total_attendance_time = round(total_attendance_time, 2)  # 精确到小数点后两位
                #     sheet.write(index + 1, 3, total_attendance_time)  # 将平均在线时长写入第四列
                # else:
                #     sheet.write(index + 1, 3, 0)  # 如果字典为空，则平均在线时长为0


if __name__ == '__main__':
    # main函数中的参数默认为全局变量
    path = r'excel'
    # 创建一个worksheet
    workbook = xlwt.Workbook()
    cursor = conn.cursor()
    solfeggio_traversal()

    if not os.path.exists(path):
        os.makedirs(path)
    workbook.save(os.path.join(path, '学生在线时间2023-1222.xls'))

    conn.commit()
    conn.close()
