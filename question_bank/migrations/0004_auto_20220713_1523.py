# Generated by Django 3.2.13 on 2022-07-13 15:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('question_bank', '0003_sightsingingquestion_lesson_no'),
    ]

    operations = [
        migrations.AlterField(
            model_name='sightsingingquestion',
            name='lesson_No',
            field=models.CharField(max_length=5),
        ),
        migrations.AlterField(
            model_name='sightsingingquestion',
            name='part_name',
            field=models.CharField(max_length=20),
        ),
    ]
