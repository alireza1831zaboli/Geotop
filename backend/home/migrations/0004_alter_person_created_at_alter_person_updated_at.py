# Generated by Django 5.0.3 on 2024-05-25 12:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0003_person_birth_date_person_created_at_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='person',
            name='created_at',
            field=models.DateField(blank=True, null=True, verbose_name='Created At'),
        ),
        migrations.AlterField(
            model_name='person',
            name='updated_at',
            field=models.DateField(blank=True, null=True, verbose_name='Updated At'),
        ),
    ]
