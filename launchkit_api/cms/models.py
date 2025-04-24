from django.db import models
import uuid
from django.utils.text import slugify


class ContenBlockModel(models.Model):

    CONTENT_TYPES = [
        ('text', 'Text'),
        ('image', 'Image'),
        ('link', 'Link'),
    ]

    STATUS_TYPES = [
        ('draft', 'Draft'),
        ('published', 'Published'),
    ]

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=100)
    slug = models.SlugField(unique=True, blank=True, db_index=True)
    content_type = models.CharField(max_length=30, choices=CONTENT_TYPES)
    content = models.TextField(blank=True)
    status = models.CharField(max_length=20, choices=STATUS_TYPES, default='draft')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)


    
    def __str__(self):
        return self.title