from django.db import models
import uuid
from django.utils.text import slugify
from django.utils import timezone
from django.db.models import Count


class CategoryModel(models.Model):
    name = models.CharField(max_length=150)
    slug = models.SlugField(unique=True, blank=True)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)



class PostQuerySet(models.QuerySet):
    def with_view_counts(self):
        return self.annotate(view_count=Count('views'))

    def top_viewed(self, limit=5):
        return self.with_view_counts().order_by('-view_count')[:5]


class ContentModel(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=200)
    slug = models.SlugField(unique=True, blank=True)
    content = models.TextField()
    img = models.ImageField(upload_to='blog/', null=True, blank=True)
    is_published = models.BooleanField(default=False)
    reading_time = models.PositiveIntegerField()
    categories = models.ManyToManyField(CategoryModel, blank=True)
    seo_title = models.CharField(max_length=250, blank=True)
    seo_description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    published_at = models.DateTimeField(auto_now_add=True)

    objects = PostQuerySet.as_manager()
   

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)


    
    def __str__(self):
        return self.title
    

class PostView(models.Model):
    post = models.ForeignKey(ContentModel, on_delete=models.CASCADE, related_name='views')
    viewed_at = models.DateTimeField(default=timezone.now)
    ip_address = models.GenericIPAddressField(null=True, blank=True)