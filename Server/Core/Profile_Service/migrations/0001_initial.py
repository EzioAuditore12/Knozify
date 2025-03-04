# Generated by Django 4.1.13 on 2025-02-14 12:54

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('Authentication_Service', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Following',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('followee', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='following_followee', to='Authentication_Service.userdetails')),
                ('follower', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='following_follower', to='Authentication_Service.userdetails')),
            ],
            options={
                'db_table': 'Following Records',
            },
        ),
        migrations.CreateModel(
            name='Follow_Request_Pending',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('request_datetime', models.DateTimeField(auto_now_add=True)),
                ('follow_req_reciever', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='follow_request_received', to='Authentication_Service.userdetails')),
                ('follow_req_sender', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, related_name='follow_request_sent', to='Authentication_Service.userdetails')),
            ],
            options={
                'db_table': 'Follow Request Pending',
            },
        ),
    ]
