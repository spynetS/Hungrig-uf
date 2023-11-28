from django.urls import path
from . import views

urlpatterns = [
    path('create_user/', views.create_user, name='create_user'),
    path('log_in/', views.log_in, name='log_in'),
    path('get_user_info/', views.get_user_info, name='get_user_info'),
    path('get_users', views.get_users, name='get_users'),
    path('alive_sessions/', views.getSessions, name='alive_sessions'),
    path('delete_session/', views.deleteSession, name='delete_session'),
    path('set_favorit_recipe/', views.set_favorit_recipe, name='set_favorit_recipe'),
    path('upload_profile_picture/', views.upload_profile_picture, name='upload_profile_picture'),
    path('toggle_follow/', views.toggle_follow, name='toggle_follow'),
    # upload_profile_picture
    # Add more URL patterns as needed
]
