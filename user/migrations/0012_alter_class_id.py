# Generated by Django 3.2.13 on 2022-10-21 14:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0011_alter_class_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='class',
            name='id',
            field=models.AutoField(auto_created=True, primary_key=True, serialize=False),
        ),
    ]
