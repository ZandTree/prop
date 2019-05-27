from django.urls import path
from . import views

app_name = 'listings'

urlpatterns = [
    path('', views.Listings.as_view(),name='listings'),
    path('detail/<int:pk>/', views.Detail.as_view(),name='listing-detail'),
    path('search/',views.TestSearch.as_view(),name='search'),

]
