# Generated by Django 3.2.13 on 2022-08-26 15:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('homework', '0012_rename_quse_type_sightsingingrecord_ques_type'),
    ]

    operations = [
        migrations.AddField(
            model_name='quesgrouprecord',
            name='record_id',
            field=models.BigIntegerField(null=True),
        ),
    ]
