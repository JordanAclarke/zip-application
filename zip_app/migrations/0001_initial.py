# Generated by Django 2.2.4 on 2019-08-12 19:05

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('cate_title', models.CharField(max_length=500)),
                ('description', models.CharField(max_length=900)),
                ('photo_url', models.CharField(max_length=800)),
            ],
        ),
        migrations.CreateModel(
            name='Post',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('username', models.CharField(max_length=500)),
                ('user_photo', models.CharField(max_length=800)),
                ('date', models.CharField(max_length=500)),
                ('title', models.CharField(max_length=500)),
                ('location', models.CharField(max_length=250)),
                ('mood', models.CharField(max_length=250)),
                ('text_photo', models.CharField(max_length=800)),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='posts', to='zip_app.Category')),
            ],
        ),
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('username', models.CharField(max_length=500)),
                ('user_photo', models.CharField(max_length=800)),
                ('date', models.CharField(max_length=500)),
                ('user_location', models.CharField(max_length=250)),
                ('post', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='comments', to='zip_app.Post')),
            ],
        ),
    ]