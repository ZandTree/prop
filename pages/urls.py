from django.urls import path
from . import views

app_name = 'pages'

urlpatterns = [
    path('', views.IndexPage.as_view(),name='index'),
    path('about/', views.AboutPage.as_view(),name='about'),
]
