# -*- encoding: utf-8 -*-
"""
@File    :   update_choice_scores.py
@Contact :   licm@bupt.edu.cn
@License :   MIT LICENSE

@Modify Time      @Author    @Version    @Description
------------      -------    --------    -----------
2024/4/15 22:11   Jimmy Li      1.0         None
"""
import pymysql.cursors

from solfeggio_django.settings import DATABASES


def update_individual_scores(part_id):
    connection = pymysql.connect(
        host=DATABASES['default']['HOST'],
        user=DATABASES['default']['USER'],
        passwd=DATABASES['default']['PASSWORD'],
        db=DATABASES['default']['NAME'],
        port=3306,
        charset='utf8mb4'
    )
    try:
        with connection.cursor() as cursor:
            # 获取选择题目对象
            query = f"SELECT * FROM question_bank_choicequestion WHERE part_id = '{part_id}'"
            cursor.execute(query)
            question = cursor.fetchone()

            if question:
                # 获取该题组下所有学生的提交记录
                query = f"SELECT * FROM homework_choicerecord WHERE part_id = '{part_id}'"
                cursor.execute(query)
                records = cursor.fetchall()

                for record in records:
                    # 检查学生提交的答案是否正确
                    if record[3] == question[2].lower():
                        score = question[11]
                    else:
                        score = 0

                    # 更新学生的成绩
                    query = f"UPDATE homework_choicerecord SET score = {score} WHERE id = {record[0]}"
                    cursor.execute(query)

                connection.commit()
                print(f"已更新题目 {part_id} 及其所在题组下所有学生的成绩。")
            else:
                print(f"未找到题目 {part_id}。")
    finally:
        connection.close()


def update_group_scores(group_part_id):
    connection = pymysql.connect(
        host=DATABASES['default']['HOST'],
        user=DATABASES['default']['USER'],
        passwd=DATABASES['default']['PASSWORD'],
        db=DATABASES['default']['NAME'],
        port=3306,
        charset='utf8mb4'
    )
    try:
        with connection.cursor() as cursor:
            # 获取该题组下所有学生的提交记录
            query = f"SELECT DISTINCT user_id FROM homework_choicerecord WHERE part_id LIKE '{group_part_id}%'"
            cursor.execute(query)
            users = cursor.fetchall()

            for user in users:
                # 获取该用户在该题组下的所有小题题目分数总和
                query = f"SELECT SUM(score) AS total_score FROM homework_choicerecord WHERE user_id = {user[0]} AND part_id LIKE '{group_part_id}%'"
                cursor.execute(query)
                result = cursor.fetchone()
                user_score = result[0] if result[0] is not None else 0

                # 更新题组表中对应用户的小题题目分数总和
                query = f"UPDATE homework_quesgrouprecord SET computer_score = {user_score}, teacher_score = {user_score} WHERE user_id = {user[0]} AND group_part_id = '{group_part_id}'"
                cursor.execute(query)

            connection.commit()
            print(f"已更新题组 {group_part_id} 下所有用户的小题题目分数总和。")
    finally:
        connection.close()


# 示例用法
if __name__ == "__main__":
    part_id = input("请输入题目的 part_id：")
    update_individual_scores(part_id)
    group_part_id = part_id[:-2]
    update_group_scores(group_part_id)
