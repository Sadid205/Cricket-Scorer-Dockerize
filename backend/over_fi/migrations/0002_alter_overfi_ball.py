# Generated by Django 5.1 on 2024-09-03 11:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('balls', '0002_alter_balls_ball_types'),
        ('over_fi', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='overfi',
            name='ball',
            field=models.ManyToManyField(blank=True, related_name='over_fi', to='balls.balls'),
        ),
    ]