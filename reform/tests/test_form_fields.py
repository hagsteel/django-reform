from django.db import models
from unittest import TestCase
from rest_framework.serializers import ModelSerializer
from ..form import ReactForm
from .. import fields


class FooForm(ReactForm):
    form_name = 'foo-form'
    create_url = 'test'
    update_url = 'test'
    name = fields.CharField(max_length=255, default='Veronica')
    is_true = fields.BooleanField(default=True)


class BarForm(ReactForm):
    form_name = 'bar-form'
    create_url = 'test'
    update_url = 'test'
    name = fields.CharField(max_length=255, default='Veronica')
    is_true = fields.BooleanField(default=True)

    class Meta:
        exclude = ['is_true']


class FooModel(models.Model):
    name = models.CharField(max_length=100)
    is_foo = models.BooleanField(default=True)
    date = models.DateTimeField()


class FooSerializer(ModelSerializer):
    class Meta:
        model = FooModel
        fields = ['name', 'date']


class SerializerForm(ReactForm):
    form_name = 'serform'
    create_url = 'test'
    update_url = 'test'
    class Meta:
        serializer_class = FooSerializer


class ReactFormTest(TestCase):
    def test_get_fields(self):
        form = FooForm()
        fields = form.fields
        self.assertIsNotNone(fields.get('name'))
        self.assertIsNotNone(fields.get('is_true'))

    def test_get_serializer_fields(self):
        form = SerializerForm()
        fields = form.fields
        self.assertIsNotNone(fields.get('name'))
        self.assertIsNotNone(fields.get('date'))
        self.assertIsNone(fields.get('is_foo'))

    def test_exclude_fields(self):
        form = BarForm()
        self.assertIsNotNone(form.fields.get('name'))
        self.assertIsNone(form.fields.get('is_true'))
