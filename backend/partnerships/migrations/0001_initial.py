# Generated by Django 5.1 on 2024-08-30 11:23

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('batsman', '0001_initial'),
        ('match', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Partnerships',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('total_run', models.IntegerField(blank=True, default=0, null=True)),
                ('total_ball', models.FloatField(blank=True, default=0.0, null=True)),
                ('batsman1', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='batsman1', to='batsman.batsman')),
                ('batsman2', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='batsman2', to='batsman.batsman')),
                ('match', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='patnerships', to='match.match')),
            ],
        ),
    ]