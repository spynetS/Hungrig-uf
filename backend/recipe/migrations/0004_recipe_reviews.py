# Generated by Django 4.2.7 on 2023-11-27 20:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('recipe', '0003_alter_recipe_comments'),
    ]

    operations = [
        migrations.AddField(
            model_name='recipe',
            name='reviews',
            field=models.IntegerField(default=0),
        ),
    ]