# Generated by Django 2.2.4 on 2019-08-15 14:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('zip_app', '0005_post_text'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='comment',
            name='user_location',
        ),
        migrations.RemoveField(
            model_name='post',
            name='location',
        ),
        migrations.AlterField(
            model_name='comment',
            name='date',
            field=models.DateTimeField(auto_now_add=True),
        ),
        migrations.AlterField(
            model_name='comment',
            name='user_photo',
            field=models.CharField(blank=True, max_length=800, null=True),
        ),
        migrations.AlterField(
            model_name='post',
            name='date',
            field=models.DateTimeField(auto_now_add=True),
        ),
        migrations.AlterField(
            model_name='post',
            name='text_photo',
            field=models.CharField(blank=True, max_length=800, null=True),
        ),
        migrations.AlterField(
            model_name='post',
            name='user_photo',
            field=models.CharField(blank=True, max_length=800, null=True),
        ),
    ]
