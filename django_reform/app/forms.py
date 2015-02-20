from django_reform.app.serializers import FooSerializer
from reform.form import ReactForm


class FooForm(ReactForm):
    form_name = 'foo-form'
    create_url = '/'
    update_url = '/'

    class Meta:
        serializer_class = FooSerializer


class BarForm(ReactForm):
    form_name = 'bar-form'
    create_url = '/'
    update_url = '/'

    class Meta:
        serializer_class = FooSerializer
