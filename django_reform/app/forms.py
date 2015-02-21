from django_reform.app.serializers import FooSerializer
from reform import fields
from reform.form import ReactForm


class FooForm(ReactForm):
    form_name = 'foo-form'
    create_url = '/'
    update_url = '/'

    class Meta:
        serializer_class = FooSerializer


class BarForm(ReactForm):
    CHOICES = (
        ('a', 'A'),
        ('b', 'B'),
    )

    form_name = 'bar-form'
    create_url = '/'
    update_url = '/'

    name = fields.RadioListField(choices=CHOICES, label='Name', required=False)
    dec = fields.DecimalField(min_value=10, max_value=20, decimal_places=3, label='fancy decimal field')

    class Meta:
        serializer_class = FooSerializer
