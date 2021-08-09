from typing import Set
from django.db.models import manager
from crime import serializer
from crime.models import Crime
from django.http import JsonResponse
from crime.serializer import CrimeSerializer

# Create your views here.


def offence_list(request, region):
    # get()只能返回一行数据，filter会返回多行数据，如果这里不采用order_by，前端显示会出现问题
    offences = Crime.objects.filter(locality=region).order_by('offence', 'financial_year')
    serializer = CrimeSerializer(offences, many=True)

    return JsonResponse(serializer.data, safe=False)

def offence_list_yearly(request, region ,year):
    offences = Crime.objects.filter(locality=region, financial_year=year).order_by('offence')

    serializer = CrimeSerializer(offences, many=True)
    
    return JsonResponse(serializer.data, safe=False)

# 实现字典的切片
# def slice_dict(dict, start, end):
#     keys = []
#     newDict = {}
#     for i in dict.keys():
#         keys.append(i)
#     for item in keys[start: end]:
#         newDict[item] = dict[item]
#     return newDict
