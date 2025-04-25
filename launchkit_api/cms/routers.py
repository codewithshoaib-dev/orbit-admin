from rest_framework.routers import DefaultRouter
from .viewsets import ContentViewSet, CategoryViewSet

router = DefaultRouter()
router.register(r'content', ContentViewSet)
router.register(r'categories', CategoryViewSet)

urlpatterns = router.urls