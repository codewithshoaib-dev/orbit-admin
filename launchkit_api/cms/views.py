from rest_framework.generics import RetrieveAPIView
from rest_framework.permissions import AllowAny
from .serializers import ContentBlockSerializer
from .models import ContenBlockModel
from launchkit_api.authentication import CustomCookieJWTAuthentication

class PublicContentBySlugView(RetrieveAPIView):
    authentication_classes = [CustomCookieJWTAuthentication]
    queryset = ContenBlockModel.objects.filter(status='published')
    serializer_class = ContentBlockSerializer
    permission_classes = [AllowAny]
    lookup_field = 'slug'
