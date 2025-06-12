from rest_framework import generics, status
from .models import ContactMessage
from .serializers import ContactMessageSerializer
from django.conf import settings
from django.core.mail import send_mail
from rest_framework.response import Response
from rest_framework.permissions import AllowAny


from django.utils import timezone
from django.contrib.auth import get_user_model
from django.db.models import Count, Sum
from rest_framework.views import APIView

from datetime import timedelta
from django.db.models.functions import TruncDate

from cms.models import ContentModel, PostView

from launchkit_api.authentication import CustomCookieJWTAuthentication

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
    

class DashboardStatsView(APIView):
    authentication_classes = [CustomCookieJWTAuthentication]
    def get(self, request):
        now = timezone.now()
        
        week_ago = now - timedelta(days=6)

        User = get_user_model()

        
        chart_data = []

        for i in range(7):
            day = (week_ago + timedelta(days=i)).date()

            views_count = PostView.objects.filter(
                viewed_at__date=day
            ).count()

            new_users_count = User.objects.filter(
                date_joined__date=day
            ).count()

            chart_data.append({
                "name": day.strftime("%A"),  
                "views": views_count,
                "users": new_users_count
            })


        top_posts = ContentModel.objects.top_viewed()
        most_viewed_posts = [
            {
                "id": post.id,
                "title": post.title,
                "views": post.views.count()
            }
            for post in top_posts
        ]
        
        total_posts = ContentModel.objects.count()
        published_posts = ContentModel.objects.filter(is_published=True).count()
        total_views = ContentModel.objects.aggregate(total=Sum('views'))['total'] or 0
        total_users = User.objects.count()

        stats = {
            "posts": total_posts,
            "published": published_posts,
            "views": total_views,
            "users": total_users
        }

      
        data = {
            "chartData": chart_data,
            "mostViewedPosts": most_viewed_posts,
            "stats": stats
        }
        
        return Response(data, status=status.HTTP_200_OK)
