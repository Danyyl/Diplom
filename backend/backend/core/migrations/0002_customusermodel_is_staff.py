# Generated by Django 3.1.7 on 2021-04-05 16:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='customusermodel',
            name='is_staff',
            field=models.BooleanField(default=True),
        ),
    ]
