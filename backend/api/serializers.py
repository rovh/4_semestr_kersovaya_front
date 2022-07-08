from rest_framework.serializers import ModelSerializer
from .models import Article, Category, Tag


class CategorySerializer(ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


class TagSerializer(ModelSerializer):
    class Meta:
        model = Tag
        fields = '__all__'


class ArticleSerializer(ModelSerializer):
    tags = TagSerializer(source='tag', many=True)
    cats = TagSerializer(source='category', many=True)
    class Meta:
        model = Article
        exclude = ['tag','category']
