# Generated by Django 5.2 on 2025-05-01 03:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cms', '0004_contentmodel_views'),
    ]

    operations = [
        migrations.AlterField(
            model_name='contentmodel',
            name='published_at',
            field=models.DateTimeField(auto_now_add=True),
        ),
    ]
