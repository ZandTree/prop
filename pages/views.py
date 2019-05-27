from django.shortcuts import render
from django.views.generic import ListView,View
from listings.models import Listing
from realtors.models import Realtor
from listings.forms import SearchForm
from django.contrib import messages

class IndexPage(ListView):
    model = Listing
    template_name = 'pages/index.html'
    paginate_by = 3

    def get_queryset(self):
        qs = Listing.objects.order_by('-list_date').filter(is_published=True)[:3]
        return qs
    def get_context_data(self,**kwargs):
        context = super().get_context_data(**kwargs)
        values = self.request.POST
        print('values from req.post',values)
        context['values'] = values
        form = SearchForm()
        context['form'] = form
        return context


# templates\pages\about.html (Source does not exist)
class AboutPage(ListView):
    model = Realtor
    template_name = 'pages/about.html'

    def get_queryset(self):
        return Realtor.objects.order_by('-hire_date')
    def get_context_data(self,**kwargs):
        context = super().get_context_data(**kwargs)
        context['best_mvps'] = Realtor.objects.filter(is_mvp=True)
        return context
