# Generated by Django 5.1.3 on 2024-11-27 17:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('attraction', '0002_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='attraction',
            name='location',
        ),
        migrations.AddField(
            model_name='attraction',
            name='address_string',
            field=models.CharField(blank=True, max_length=1024),
        ),
        migrations.AddField(
            model_name='attraction',
            name='city',
            field=models.CharField(blank=True, max_length=255),
        ),
        migrations.AddField(
            model_name='attraction',
            name='country',
            field=models.CharField(blank=True, max_length=255),
        ),
        migrations.AddField(
            model_name='attraction',
            name='location_id',
            field=models.CharField(default='default_location_id', max_length=255, unique=True),
        ),
        migrations.AddField(
            model_name='attraction',
            name='postalcode',
            field=models.CharField(blank=True, max_length=20),
        ),
        migrations.AddField(
            model_name='attraction',
            name='state',
            field=models.CharField(blank=True, max_length=255),
        ),
        migrations.AddField(
            model_name='attraction',
            name='street1',
            field=models.CharField(blank=True, max_length=255),
        ),
        migrations.AddField(
            model_name='attraction',
            name='street2',
            field=models.CharField(blank=True, max_length=255),
        ),
        migrations.AlterField(
            model_name='attraction',
            name='category',
            field=models.CharField(blank=True, max_length=255),
        ),
        migrations.AlterField(
            model_name='attraction',
            name='description',
            field=models.TextField(blank=True),
        ),
        migrations.AlterField(
            model_name='attraction',
            name='image_url',
            field=models.URLField(blank=True),
        ),
        migrations.AlterField(
            model_name='attraction',
            name='num_reviews',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='attraction',
            name='price_level',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='attraction',
            name='rating',
            field=models.DecimalField(blank=True, decimal_places=2, max_digits=3, null=True),
        ),
        migrations.DeleteModel(
            name='Compilation',
        ),
    ]
