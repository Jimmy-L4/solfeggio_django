# Generated by Django 3.2.13 on 2022-07-15 14:15

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('homework', '0004_alter_qusegrouprecord_state'),
    ]

    operations = [
        migrations.AlterField(
            model_name='choicerecord',
            name='score',
            field=models.IntegerField(),
        ),
        migrations.AlterField(
            model_name='choicerecord',
            name='user',
            field=models.ForeignKey(on_delete=models.SET(0), related_name='choice_user', to='auth.user'),
        ),
    ]
