# Generated by Django 3.2.13 on 2022-08-26 14:26

from django.db import migrations, models
import homework.models


class Migration(migrations.Migration):

    dependencies = [
        ('homework', '0010_quesgrouprecord_coop_user'),
    ]

    operations = [
        migrations.AddField(
            model_name='sightsingingrecord',
            name='quse_type',
            field=models.IntegerField(null=True),
        ),
        migrations.AlterField(
            model_name='audio',
            name='content',
            field=models.FileField(upload_to=homework.models.getFieldPath),
        ),
        migrations.AlterField(
            model_name='json',
            name='content',
            field=models.FileField(upload_to=homework.models.getFieldPath),
        ),
        migrations.AlterField(
            model_name='png',
            name='content',
            field=models.FileField(upload_to=homework.models.getFieldPath),
        ),
    ]