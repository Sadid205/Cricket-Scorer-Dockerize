# Generated by Django 5.1.4 on 2025-01-01 09:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('batsman', '0005_alter_batsman_how_wicket_fall'),
    ]

    operations = [
        migrations.AlterField(
            model_name='batsman',
            name='how_wicket_fall',
            field=models.CharField(blank=True, choices=[('bowled', 'Bowled'), ('catch_out', 'Catch Out'), ('run_out_striker', 'Run Out'), ('run_out_non_striker', 'Run Out'), ('stumping', 'Stumping'), ('lbw', 'LBW'), ('hit_wicket', 'Hit Wicket'), ('retired', 'Retired')], max_length=30, null=True),
        ),
    ]
