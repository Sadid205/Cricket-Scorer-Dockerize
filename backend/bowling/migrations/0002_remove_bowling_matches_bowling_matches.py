# Generated by Django 5.1.4 on 2024-12-17 17:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('bowling', '0001_initial'),
        ('match', '0004_match_is_match_finished'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='bowling',
            name='matches',
        ),
        migrations.AddField(
            model_name='bowling',
            name='matches',
            field=models.ManyToManyField(blank=True, related_name='bowling', to='match.match'),
        ),
    ]
