from django.shortcuts import render
from rest_framework import viewsets

from .serializers import CategorySerializer, PostSerializer, CommentSerializer
from .models import Category, Post, Comment
# Create your views here.

class CategoryView(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class PostView(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

class CommentView(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer