from rest_framework.serializers import ModelSerializer
from django_reform.app.models import Foo


class FooSerializer(ModelSerializer):
    class Meta:
        model = Foo
