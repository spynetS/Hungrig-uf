# Generated by Django 4.2.7 on 2023-11-30 22:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('identification', '0004_user_favorit_recipies'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='has_paid',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='user',
            name='phonenumber',
            field=models.IntegerField(default=0),
            preserve_default=False,
        ),
    ]
