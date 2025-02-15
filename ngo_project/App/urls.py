from django.urls import path
from .views import NGOListCreateView, VolunteerListCreateView, submit_form, check_status, donate

urlpatterns = [
    path('ngos/', NGOListCreateView.as_view(), name='ngo-list'),
    path('volunteers/', VolunteerListCreateView.as_view(), name='volunteer-list'),
    path('submit/', submit_form),
    path('status/<str:email>/', check_status),
    path("donate/", donate, name="donate")
]
