from rest_framework import serializers
from .models import ContentModel, CategoryModel


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = CategoryModel
        fields = ['id', 'name', 'slug']


class ContentSerializer(serializers.ModelSerializer):

    categories = CategorySerializer(many=True, read_only=True)

    class Meta:

        model = ContentModel
        fields = [
            'id', 'title', 'slug', 'seo_title', 'seo_description',
            'reading_time', 'categories', 'is_published', 'img', 'content'
        ]

class ContentCreateUpdateSerializer(serializers.ModelSerializer):
    categories = serializers.PrimaryKeyRelatedField(
        many=True, queryset=CategoryModel.objects.all()
    )

    class Meta:
        model = ContentModel
        fields = [
            'title', 'slug', 'seo_title', 'seo_description',
            'reading_time', 'categories', 'is_published', 'img', 'content'
        ]
