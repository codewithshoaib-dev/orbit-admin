from rest_framework import serializers
from .models import ContenBlockModel


class ContentBlockSerializer(serializers.ModelSerializer):

    class Meta:
        model = ContenBlockModel
        fields =  [
            'id',
            'title',
            'slug',
            'content_type',
            'content',
            'status'
        ]
        