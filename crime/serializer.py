from crime.models import Crime
from rest_framework import serializers

class CrimeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Crime
        fields = '__all__'
        # fields = (
        #     'id',
        #     'locality',
        #     'offence',
        #     'financial_year',
        #     'total_annual',
        #     'july',
        #     'august',
        #     'september',
        #     'october',
        #     'november',
        #     'december',
        #     'january',
        #     'february',
        #     'march',
        #     'april',
        #     'may',
        #     'june'
        # )
