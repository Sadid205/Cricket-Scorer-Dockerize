# Generated by Django 5.1.4 on 2024-12-21 15:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('batting', '0002_remove_batting_matches_batting_matches'),
    ]

    operations = [
        migrations.AddField(
            model_name='batting',
            name='balls',
            field=models.IntegerField(blank=True, default=0, null=True),
        ),
    ]
