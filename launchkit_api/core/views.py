from rest_framework import generics, status
from .models import ContactMessage
from .serializers import ContactMessageSerializer
from django.conf import settings
from django.core.mail import send_mail
from rest_framework.response import Response
from rest_framework.permissions import AllowAny

class ContactMessageCreteateView(generics.GenericAPIView):
    permission_classes = [AllowAny]
    serializer_class = ContactMessageSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            name = serializer.validated_data.get('name')
            email = serializer.validated_data.get('email')
            message = serializer.validated_data.get('message')

            subject = f"New CTA Form Submission from {name}"
            body = f"Email: {email}\n\nMessage:\n{message}"
            try:
                send_mail(subject, body, settings.DEFAULT_FROM_EMAIL, [settings.NOTIFY_EMAIL], fail_silently=False)
                return Response({'success': 'Message sent'}, status=status.HTTP_200_OK)
            except Exception as e:
                print('Its failing here')
                return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)