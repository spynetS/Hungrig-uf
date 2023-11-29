#!/usr/bin/env python3
from django.urls import path
from . import views

urlpatterns = [
    path('create_recipe/', views.create_recipe, name='create_user'),
    path('get_recipes/', views.get_recipes, name='get_recipes'),
    path('get_user_recipes/', views.get_user_recipes, name='get_user_recipes'),
    path('post_comment/', views.add_comment, name='post_comment'),
    path('remove_comment/', views.remove_comment, name='remove_comment'),
    path('upload_recipe/', views.upload_recipe, name='upload_recipe'),
    path('remove/', views.remove_recipe, name='remove_recipe'),
    path('review/', views.set_review, name='set_review'),
]
