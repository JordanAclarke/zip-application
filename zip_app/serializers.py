from rest_framework import serializers

from .models import Category, Post, Comment

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ('id', 'username', 'user_photo', 'date', 'response', 'user_location', 'post')

class PostSerializer(serializers.ModelSerializer):
    comments = CommentSerializer(many=True, read_only=True)
    class Meta:
        model = Post
        fields = ('id', 'username', 'user_photo', 'date', 'title', 'text', 'location', 'mood', 'text_photo', 'category', 'comments')

class CategorySerializer(serializers.ModelSerializer):
    posts = PostSerializer(many=True, read_only=True)
    class Meta:
        model = Category
        fields = ('id', 'cate_title', 'description', 'photo_url', 'posts')


