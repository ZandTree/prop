from django.shortcuts import render
from django.views.generic import ListView,DetailView,View,CreateView
from .models import Listing
from django.db.models import Q
# from listings.choices import bedroom_choices,price_choices,state_choices
from .forms import SearchForm
from listings.choices import BEDROOM_CHOICES,PRICE_CHOICES,STATE_CHOICES
from django.contrib import messages

class Listings(ListView):
    model = Listing
    paginate_by = 6

class Detail(DetailView):
    model = Listing

class TestSearch(View):
    def get(self,request):
        form = SearchForm()
        # form = JournalForm(initial={'tank': 123})
        template_name = 'listings/search.html'
        return render(request,template_name,{'form':form})

    def post(self,request):
        template_name = 'listings/listing_list.html'
        keywords = self.request.POST.get('keywords')
        if keywords:
            object_list = Listing.objects.filter(Q(title__icontains=keywords)|
                Q(description__icontains=keywords))

        city  = self.request.POST.get('city')
        if city:
            object_list = Listing.objects.filter(city__iexact=city)

        state = self.request.POST.get('state')
        if state:
            object_list = Listing.objects.filter(state__iexact=state)

        bedrooms = self.request.POST.get('bedrooms')
        if bedrooms:
            object_list = Listing.objects.filter(bedrooms__lte=bedrooms)

        price = self.request.POST.get('price')
        if price:
            object_list = Listing.objects.filter(price__lte=price)
            return render(request,template_name,{'object_list':object_list})
        else:
            object_list = Listing.objects.all()
            return render(request,template_name,{'object_list':object_list})
