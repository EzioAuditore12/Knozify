# Generated by Django 4.1.13 on 2025-02-16 07:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Streaming_Service', '0002_alter_posts_thumbnail_link'),
    ]

    operations = [
        migrations.AddField(
            model_name='posts',
            name='post_type',
            field=models.CharField(default='Text', max_length=10),
        ),
    ]
