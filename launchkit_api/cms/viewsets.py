from rest_framework import viewsets, permissions
from .models import ContenBlockModel
from .serializers import ContentBlockSerializer
from launchkit_api.authentication import CustomCookieJWTAuthentication

class ContentBlockViewSet(viewsets.ModelViewSet):
    authentication_classes = [CustomCookieJWTAuthentication]
    queryset = ContenBlockModel.objects.all()
    serializer_class = ContentBlockSerializer
    permission_classes = [permissions.IsAuthenticated]
    