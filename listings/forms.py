from .models import Listing
from django import forms
# class CommentForm(forms.ModelForm):
#     comment = forms.TextInput()
#     class Meta:
#         model = Comment
#         fields = ('comment',)
#         widgets = {'comment':forms.TextInput(
#                         attrs={'required':False,
#                             'placeholder':'your comment',
#                             })}
#         labels = {'comment':'Leave a comment'}

#
class SearchForm(forms.ModelForm):
    keywords = forms.CharField(max_length=256)
    class Meta:
        model = Listing
        fields = ('state','bedrooms','price','keywords')
        # widgets = {'keywords':forms.TextInput(attrs={"placeholder":"keyword"})}
        # widgets = {'state':forms.Select(
        #                         attrs={'required':False}),
        #             'city':forms.TextInput(attrs={"placeholder":"jijij"}),
        #             'keywords':forms.TextInput(attrs={'placeholder':"Keyword (Pool-----===="})
        #             }
