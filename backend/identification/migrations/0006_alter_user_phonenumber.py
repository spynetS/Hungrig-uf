# Generated by Django 4.2.7 on 2023-11-30 22:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('identification', '0005_user_has_paid_user_phonenumber'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='phonenumber',
            field=models.TextField(default='0'),
        ),
    ]
