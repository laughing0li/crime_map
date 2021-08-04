from django.db.models.deletion import CASCADE
from django.db import models



class Crime(models.Model):

    locality = models.CharField(max_length=100)
    offence = models.CharField(max_length=100)
    financial_year = models.CharField(max_length=100)

    total_annual = models.IntegerField()

    july = models.IntegerField()

    august = models.IntegerField()

    september = models.IntegerField()

    october = models.IntegerField()

    november = models.IntegerField()

    december = models.IntegerField()

    january = models.IntegerField()

    february = models.IntegerField()

    march = models.IntegerField()

    april = models.IntegerField()

    may = models.IntegerField()

    june = models.IntegerField()

    def __str__(self):
        return self.locality