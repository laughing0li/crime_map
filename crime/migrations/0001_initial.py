# Generated by Django 3.2.5 on 2021-07-26 14:11

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Crime',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('locality', models.CharField(max_length=100)),
                ('offence', models.CharField(max_length=100)),
                ('financial_year', models.CharField(max_length=100)),
                ('total_annual', models.IntegerField(default=0)),
                ('july', models.IntegerField(default=0)),
                ('august', models.IntegerField(default=0)),
                ('september', models.IntegerField(default=0)),
                ('october', models.IntegerField(default=0)),
                ('november', models.IntegerField(default=0)),
                ('december', models.IntegerField(default=0)),
                ('january', models.IntegerField(default=0)),
                ('february', models.IntegerField(default=0)),
                ('march', models.IntegerField(default=0)),
                ('april', models.IntegerField(default=0)),
                ('may', models.IntegerField(default=0)),
                ('june', models.IntegerField(default=0)),
            ],
        ),
    ]
