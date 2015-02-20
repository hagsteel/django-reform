from django_reform.app.serializers import FooSerializer
from reform.fields import ChoiceField
from reform.form import ReactForm


class FooForm(ReactForm):
    form_name = 'foo-form'
    create_url = '/'
    update_url = '/'

    class Meta:
        serializer_class = FooSerializer


class BarForm(ReactForm):
    CHOICES = (
        ('', 'select'),
        ('a', 'A'),
        ('b', 'B'),
    )

    form_name = 'bar-form'
    create_url = '/'
    update_url = '/'

    name = ChoiceField(choices=CHOICES, label='Name', required=True)

    class Meta:
        serializer_class = FooSerializer
