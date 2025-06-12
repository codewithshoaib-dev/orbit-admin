from rest_framework import viewsets, permissions
from .models import ContentModel, CategoryModel, PostView
from launchkit_api.authentication import CustomCookieJWTAuthentication
from .serializers import ContentSerializer, ContentCreateUpdateSerializer, CategorySerializer
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
from .pagination import PostPagination
from django.utils import timezone



class ContentViewSet(viewsets.ModelViewSet):
    
    queryset = ContentModel.objects.all()
    pagination_class = (PostPagination)
    lookup_field = 'slug'


    def get_authenticators(self):
        if self.request.method in ['POST', 'PUT', 'PATCH', 'DELETE']:
           return [CustomCookieJWTAuthentication()]
        return []

    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            return [permissions.IsAuthenticated()]
        return [] 
    
    def get_serializer_class(self):
        if self.action in ['create', 'update', 'partial_update']:
            return ContentCreateUpdateSerializer
        return ContentSerializer


    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        PostView.objects.create(post=instance, viewed_at=timezone.now())
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

        

class CategoryViewSet(viewsets.ModelViewSet):
    authentication_classes = [CustomCookieJWTAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    queryset = CategoryModel.objects.all()
    serializer_class = CategorySerializer
    lookup_field = 'id'
