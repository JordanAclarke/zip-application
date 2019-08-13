from django.urls import path, include
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register('categories', views.CategoryView)
router.register('posts', views.PostView)
router.register('comments', views.CommentView)


urlpatterns = [
    path('', include(router.urls))
]