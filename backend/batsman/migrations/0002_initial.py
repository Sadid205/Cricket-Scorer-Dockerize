# Generated by Django 5.1 on 2024-08-30 11:23

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('batsman', '0001_initial'),
        ('bowler', '0001_initial'),
        ('fielder', '0001_initial'),
        ('match', '0001_initial'),
        ('player', '0001_initial'),
        ('team', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='batsman',
            name='match',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='batsman', to='match.match'),
        ),
        migrations.AddField(
            model_name='batsman',
            name='out_by',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='bowler.bowler'),
        ),
        migrations.AddField(
            model_name='batsman',
            name='player',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='batsman', to='player.player'),
        ),
        migrations.AddField(
            model_name='batsman',
            name='run_out_by',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='run_out_by_batsman', to='fielder.fielder'),
        ),
        migrations.AddField(
            model_name='batsman',
            name='team',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='batsman', to='team.team'),
        ),
    ]