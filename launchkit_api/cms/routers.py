from rest_framework.routers import DefaultRouter
from .viewsets import ContentBlockViewSet

router = DefaultRouter()
router.register(r'content_blocks', ContentBlockViewSet)

urlpatterns = router.urls