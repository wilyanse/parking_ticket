# Generated by Django 5.2.2 on 2025-06-15 13:07

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('parking', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='reservation',
            name='parking_slot',
            field=models.ForeignKey(default='054b0b7b-ab18-468e-b04b-22af862f2c5a', on_delete=django.db.models.deletion.CASCADE, related_name='reservations', to='parking.parkingslot'),
            preserve_default=False,
        ),
    ]
