# Generated by Django 5.1 on 2024-08-30 11:23

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('balls', '0001_initial'),
        ('bowler', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='OverFI',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('wide', models.IntegerField(blank=True, default=0, null=True)),
                ('no_ball', models.IntegerField(blank=True, default=0, null=True)),
                ('byes', models.IntegerField(blank=True, default=0, null=True)),
                ('leg_byes', models.IntegerField(blank=True, default=0, null=True)),
                ('wicket', models.IntegerField(blank=True, default=0, null=True)),
                ('zero', models.IntegerField(blank=True, default=0, null=True)),
                ('one', models.IntegerField(blank=True, default=0, null=True)),
                ('two', models.IntegerField(blank=True, default=0, null=True)),
                ('three', models.IntegerField(blank=True, default=0, null=True)),
                ('four', models.IntegerField(blank=True, default=0, null=True)),
                ('six', models.IntegerField(blank=True, default=0, null=True)),
                ('palanty_runs', models.IntegerField(blank=True, default=0, null=True)),
                ('scored_runs', models.IntegerField(blank=True, default=0, null=True)),
                ('ball', models.ManyToManyField(blank=True, null=True, related_name='over_fi', to='balls.balls')),
                ('bowler', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='overs_fi', to='bowler.bowler')),
            ],
        ),
    ]