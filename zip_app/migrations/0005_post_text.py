# Generated by Django 2.2.4 on 2019-08-13 14:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('zip_app', '0004_auto_20190813_1340'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='text',
            field=models.CharField(default='Text Post', max_length=900),
        ),
    ]
