# Generated by Django 4.2.7 on 2023-11-27 21:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('recipe', '0004_recipe_reviews'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='recipe',
            name='images',
        ),
        migrations.AddField(
            model_name='recipe',
            name='image',
            field=models.ImageField(blank=True, upload_to=''),
        ),
    ]
