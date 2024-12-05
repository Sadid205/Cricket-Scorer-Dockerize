# Generated by Django 5.1 on 2024-08-30 11:23

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('player', '0001_initial'),
        ('team', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Batting',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('matches', models.IntegerField(blank=True, default=0, null=True)),
                ('innings', models.IntegerField(blank=True, default=0, null=True)),
                ('runs', models.IntegerField(blank=True, default=0, null=True)),
                ('not_outs', models.IntegerField(blank=True, default=0, null=True)),
                ('best_score', models.IntegerField(blank=True, default=0, null=True)),
                ('strike_rate', models.FloatField(blank=True, default=0.0, null=True)),
                ('average', models.FloatField(blank=True, default=0.0, null=True)),
                ('fours', models.IntegerField(blank=True, default=0, null=True)),
                ('sixs', models.IntegerField(blank=True, default=0, null=True)),
                ('thirties', models.IntegerField(blank=True, default=0, null=True)),
                ('fifties', models.IntegerField(blank=True, default=0, null=True)),
                ('hundreds', models.IntegerField(blank=True, default=0, null=True)),
                ('duckes', models.IntegerField(blank=True, default=0, null=True)),
                ('player', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='batting', to='player.player')),
                ('team', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='batting', to='team.team')),
            ],
        ),
    ]
