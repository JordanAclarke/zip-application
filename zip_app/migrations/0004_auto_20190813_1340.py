# Generated by Django 2.2.4 on 2019-08-13 13:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('zip_app', '0003_auto_20190813_1338'),
    ]

    operations = [
        migrations.AlterField(
            model_name='comment',
            name='response',
            field=models.CharField(default='Text Response', max_length=900),
        ),
    ]