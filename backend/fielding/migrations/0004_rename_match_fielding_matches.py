# Generated by Django 5.1.4 on 2024-12-17 17:39

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('fielding', '0003_remove_fielding_match_fielding_match'),
    ]

    operations = [
        migrations.RenameField(
            model_name='fielding',
            old_name='match',
            new_name='matches',
        ),
    ]
