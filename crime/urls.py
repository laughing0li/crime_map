from django.urls import path
from crime import views

app_name = 'crime'

urlpatterns = [
    path('<str:region>/', views.offence_list, name='list'),
    # path('all/', views.offence_all, name='all_list'),
    path('<str:region>/<str:year>/', views.offence_list_yearly, name='year_list'),
]