# Generated by Django 2.1 on 2018-09-18 10:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('eauth', '0002_auto_20180903_0811'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='balance',
            field=models.IntegerField(default=20),
        ),
        migrations.AlterField(
            model_name='user',
            name='subscription',
            field=models.CharField(default='basic', max_length=200),
        ),
    ]
