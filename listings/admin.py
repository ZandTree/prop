from django.contrib import admin
from .models import Listing

class ListingAdmin(admin.ModelAdmin):
    list_display = ('id','title','realtor','list_date','price','is_published')
    list_filter = ('list_date',)
    list_display_links = ('id','title',)
    list_editable = ('is_published',)
    search_fields = ('title','realtor','description','bathrooms','price','zipcode')
    list_per_page = 25

admin.site.register(Listing,ListingAdmin)

# Register your models here.
