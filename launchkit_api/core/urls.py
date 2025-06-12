from django.urls import path
from . import views


urlpatterns = [
    path('contact', views.ContactMessageCreteateView.as_view(), name='contact-message'),
    path('stats', views.DashboardStatsView.as_view(), name='contact-message'),

]