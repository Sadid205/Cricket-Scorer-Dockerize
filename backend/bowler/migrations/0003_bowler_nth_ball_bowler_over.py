# Generated by Django 5.1 on 2024-09-08 17:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bowler', '0002_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='bowler',
            name='nth_ball',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='bowler',
            name='over',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]
