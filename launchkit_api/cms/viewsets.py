from rest_framework import viewsets, permissions
from .models import ContentModel, CategoryModel
from launchkit_api.authentication import CustomCookieJWTAuthentication
from .serializers import ContentSerializer, ContentCreateUpdateSerializer, CategorySerializer
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status

class ContentViewSet(viewsets.ModelViewSet):
    queryset = ContentModel.objects.all()

    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            return [permissions.IsAuthenticated()]
        return [] 
    
    def get_authenticators(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            return [CustomCookieJWTAuthentication()]
        return []

    def get_serializer_class(self):
        if self.action in ['create', 'update', 'partial_update']:
            return ContentCreateUpdateSerializer
        return ContentSerializer

    @action(detail=True, methods=['post'])
    def track_view(self, request, pk=None):
        instance = self.get_object()
        instance.views += 1
        instance.save(update_fields=['views'])
        return Response({'message': 'View counted'})
    


class CategoryViewSet(viewsets.ModelViewSet):
    authentication_classes = [CustomCookieJWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    queryset = CategoryModel.objects.all()
    serializer_class = CategorySerializer
