from django.db import models

# Create your models here.
class Category(models.Model):
    cate_title = models.CharField(max_length=500)
    description = models.CharField(max_length=900)
    photo_url = models.CharField(max_length=800)

    def __str__(self):
        return self.cate_title

class Post(models.Model):
    username = models.CharField(max_length=500)
    user_photo = models.CharField(max_length=800)
    date = models.CharField(max_length=500)
    title = models.CharField(max_length=500)
    text: models.CharField(max_length=900)
    location = models.CharField(max_length=250)
    mood = models.CharField(max_length=250)
    text_photo = models.CharField(max_length=800)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='posts')

    def __str__(self):
        return self.title

class Comment(models.Model):
    username = models.CharField(max_length=500)
    user_photo = models.CharField(max_length=800)
    date = models.CharField(max_length=500)
    response = models.CharField(max_length=900, default='Text Response')
    user_location = models.CharField(max_length=250)
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='comments')

    def __str__(self):
        return self.response

