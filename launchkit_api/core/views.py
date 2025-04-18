from rest_framework import generics
from .models import ContactMessage
from .serializers import ContactMessageSerializer

class ContactMessageCreteateView(generics.CreateAPIView):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer