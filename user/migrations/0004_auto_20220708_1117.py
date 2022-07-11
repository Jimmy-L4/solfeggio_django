# Generated by Django 3.2.13 on 2022-07-08 11:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0003_alter_student_id'),
    ]

    operations = [
        migrations.RenameField(
            model_name='student',
            old_name='updated',
            new_name='avatar',
        ),
        migrations.AlterField(
            model_name='student',
            name='course',
            field=models.ManyToManyField(related_name='student_course', to='user.Course'),
        ),
        migrations.AlterField(
            model_name='student',
            name='id',
            field=models.BigIntegerField(primary_key=True, serialize=False),
        ),
    ]
