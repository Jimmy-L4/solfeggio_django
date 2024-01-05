# -*- encoding: utf-8 -*-
"""
@File    :   online_info_export.py
@Contact :   licm@bupt.edu.cn
@License :   (C)Copyright Null

@Modify Time      @Author    @Version    @Description
------------      -------    --------    -----------
2023/12/21 18:15   Jimmy.li      1.0     导出学生成绩
"""

import os

import numpy as np
import pymysql
import xlwt

from solfeggio_django.settings import DATABASES

conn = pymysql.connect(
    host=DATABASES['default']['HOST'],
    user=DATABASES['default']['USER'],
    passwd=DATABASES['default']['PASSWORD'],
    db=DATABASES['default']['NAME'],
    port=3306,
    charset='utf8mb4'
)


def get_student(class_rank):
    student_list = []
    # 根据级别获取学生列表（过滤测试班级和李崇明）
    sql_select_stu = "select stu.user_id, stu.id, stu.name, cls.name from user_student stu " \
                     "left join user_class cls on cls.id=stu.my_class_id  " \
                     "left join user_course crs on cls.course_id=crs.id " \
                     "where crs.grade ='%s' and cls.name !='测试班级' and stu.user_id != 1 order by stu.user_id" % class_rank
    data_count = cursor.execute(sql_select_stu)
    data = cursor.fetchall()
    fields = cursor.description
    return data


def get_score(data, difficulty):
    # 单声部精唱 单声部视谱即唱 双声部
    sing_score_sheet = np.zeros((3, 8))
    # 音阶 音组 音程 和弦 节奏 单声部旋律 双声部旋律
    ear_training_score_sheet = np.zeros((7, 8))
    # 零分作业
    type_dic = ["单声部精唱", "单声部视谱即唱", "双声部"]
    zero_homework = []
    for item in data:
        # 根据级别过滤成绩，因为数据库存在学生上一级别提交的作业
        if item[4] is not None and item[0][-3] == difficulty[1]:
            group_part_id = item[0]
            question_type = int(group_part_id[2])
            lesson_No = int(item[1])
            # 视唱题目
            if group_part_id[0] == '0':
                # 单独列出被老师判为0分的作业 以防误判
                if item[4] == 0:
                    zero_homework.append({"题目类型": type_dic[question_type - 1], "课次": lesson_No - 1})
                sing_score_sheet[question_type - 1][lesson_No - 1] = item[4]
            # 练耳题目
            else:
                ear_training_score_sheet[question_type - 1][lesson_No - 1] = item[4]

    sing_weights = np.array([[0.3, 0.3, 0.4]])
    sing_score_sheet = sing_weights.dot(sing_score_sheet)
    sing_score = round(np.mean(sing_score_sheet), 3)
    print(sing_score_sheet, sing_score)

    ear_training_score_sheet = np.sum(ear_training_score_sheet, axis=0)
    ear_training_score = round(np.mean(np.mean(ear_training_score_sheet)), 3)
    print(ear_training_score_sheet, ear_training_score)
    score = round(np.mean([ear_training_score, sing_score]), 3)
    print(score)

    if not zero_homework:
        zero_homework = " "

    return sing_score_sheet, sing_score, ear_training_score_sheet, ear_training_score, score, round(score * 0.3,
                                                                                                    3), zero_homework


def solfeggio_traversal():
    difficulties = ["04"]
    sheet = workbook.add_sheet('学生成绩', cell_overwrite_ok=True)
    sheet.write(0, 0, '学号')
    sheet.write(0, 1, '姓名')
    sheet.write(0, 2, '班级')
    sheet.write(0, 3, '视唱八课次成绩')
    sheet.write(0, 4, '视唱平均分')
    sheet.write(0, 5, '练耳八课次成绩')
    sheet.write(0, 6, '练耳平均分')
    sheet.write(0, 7, '总成绩')
    sheet.write(0, 8, '总成绩*0.3')
    sheet.write(0, 9, '视唱零分作业')
    for difficulty in difficulties:
        student_list = get_student(difficulty)
        print("*" * 40 + '共有' + str(len(student_list)) + '名学生' + "*" * 40)
        for index, student in enumerate(student_list):
            print("*" * 40 + student[3] + ' —— ' + student[2] + "*" * 40)
            for j in range(3):
                sheet.write(index + 1, j, student[j + 1])
            if student[0] is not None:
                sql_select_stu = "select group_part_id, lesson_No, user_id, coop_user_id, teacher_score " \
                                 "from homework_quesgrouprecord " \
                                 "where user_id='%s' or coop_user_id='%s'" % (student[0], student[0])
                data_count = cursor.execute(sql_select_stu)
                data = cursor.fetchall()
                score_list = get_score(data, difficulty)
                for j, score in enumerate(score_list):
                    sheet.write(index + 1, j + 3, str(score))


if __name__ == '__main__':
    # main函数中的参数默认为全局变量
    path = r'excel'
    # 创建一个worksheet
    workbook = xlwt.Workbook()
    cursor = conn.cursor()
    solfeggio_traversal()

    # 保存
    workbook.save(os.path.join(path, '学生成绩2023-12-.xls'))
    conn.commit()
    conn.close()
