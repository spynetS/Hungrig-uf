# Generated by Django 4.2.7 on 2023-11-27 23:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('recipe', '0006_delete_image_comment_created_recipe_created'),
        ('identification', '0003_user_follow'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='favorit_recipies',
            field=models.ManyToManyField(to='recipe.recipe'),
        ),
    ]
