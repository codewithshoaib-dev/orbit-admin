from .models import ContentModel, CategoryModel
from django.contrib.auth import get_user_model
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions
from django.db.models import Sum


User = get_user_model()

class DashboardStatsView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):

        posts = ContentModel.objects.count()
        published = ContentModel.objects.filter(is_published=True).count()
        recent_posts = ContentModel.objects.order_by('-created_at')[:5].values('title', 'views', 'created_at')
        views = ContentModel.objects.aggregate(Sum('views'))['views__sum'] or 0
        users = User.objects.count()
        categories = CategoryModel.objects.count()
        
        return Response({
            'posts': posts,
            'published': published,
            'recent_posts': recent_posts,
            'views': views,
            'categories': categories,
            'users': users,
        })
