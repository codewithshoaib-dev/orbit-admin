from rest_framework import serializers
from .models import ContentModel, CategoryModel


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = CategoryModel
        fields = ['id', 'name', 'slug']


class ContentSerializer(serializers.ModelSerializer):

    categories = CategorySerializer(many=True, read_only=True)
    img = serializers.ImageField(use_url=True)

    class Meta:

        model = ContentModel
        fields = [
            'id', 'title', 'slug', 'seo_title', 'seo_description',
            'reading_time', 'categories', 'is_published', 'img', 'content', 'published_at'
        ]

class ContentCreateUpdateSerializer(serializers.ModelSerializer):
    categories = serializers.PrimaryKeyRelatedField(
        many=True, queryset=CategoryModel.objects.all()
    )
    img = serializers.ImageField(use_url=True, required=False, allow_null=True)

    class Meta:
        model = ContentModel
        fields = [
            'title', 'slug', 'seo_title', 'seo_description',
            'reading_time', 'categories', 'is_published', 'img', 'content'
        ]
