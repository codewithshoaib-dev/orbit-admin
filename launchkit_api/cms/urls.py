from django.urls import path
from .views import PublicContentBySlugView

urlpatterns = [
    path('content/<slug:slug>/', PublicContentBySlugView.as_view(), name='public-content-by-slug'),
]
