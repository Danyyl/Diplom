# Generated by Django 3.1.7 on 2021-04-28 12:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0005_auto_20210406_1648'),
    ]

    operations = [
        migrations.AddField(
            model_name='customusermodel',
            name='first_name',
            field=models.CharField(default='default', max_length=40),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='customusermodel',
            name='last_name',
            field=models.CharField(default='default', max_length=40),
            preserve_default=False,
        ),
    ]
