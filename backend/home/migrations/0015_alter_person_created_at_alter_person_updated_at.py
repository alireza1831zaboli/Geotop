# Generated by Django 5.0.3 on 2024-05-26 10:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0014_alter_person_created_at_alter_person_updated_at'),
    ]

    operations = [
        migrations.AlterField(
            model_name='person',
            name='created_at',
            field=models.DateField(auto_now_add=True, verbose_name='Created At'),
        ),
        migrations.AlterField(
            model_name='person',
            name='updated_at',
            field=models.DateField(auto_now=True, verbose_name='Updated At'),
        ),
    ]
