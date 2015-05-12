from collections import OrderedDict
from django.core.urlresolvers import reverse
from .drf_fields import drf_field_to_field
from .fields import Field


class ReactFormMeta(object):
    def __init__(self, options=None):
        self.fields = []
        self.serializer_class = None
        self.exclude = []

        if options:
            self.serializer_class = getattr(options, 'serializer_class', None)
            self.fields = getattr(options, 'fields', [])
            self.exclude = getattr(options, 'exclude', [])


class ReactForm(object):
    Meta = None
    create_url_name = None
    create_url = None
    update_url_name = None
    update_url = None
    form_name = None
    id_field = 'id'

    def __init__(self, name=None):
        if name:
            self.form_name = name
        assert self.form_name is not None, 'A ReactForm requires a unique "name" per form'

        self.opts = ReactFormMeta(self.Meta)
        self.fields = OrderedDict()
        fields = {}

        if self.opts.serializer_class:
            drf_fields = self.opts.serializer_class().fields.items()
            for name, drf_field in drf_fields:
                if name in self.opts.exclude:
                    continue
                if self.opts.fields and name not in self.opts.fields:
                    continue
                field = drf_field_to_field(drf_field)
                if field:
                    fields[name] = field

        for name, field in self.__class__.__dict__.items():
            if name in self.opts.exclude or not isinstance(field, Field):
                continue
            fields[name] = field

        if self.opts.fields:
            for name in self.opts.fields:
                self.fields[name] = fields[name]
        else:
            self.fields = fields

    def get_create_url(self, **kwargs):
        if self.create_url_name:
            return reverse(self.create_url_name)
        return self.create_url

    def get_update_url(self, **kwargs):
        if self.update_url_name:
            return reverse(self.update_url_name)
        return self.update_url

    def to_dict(self):
        data = dict({
            'name': self.form_name,
            'create_url': self.get_create_url(),
            'update_url': self.get_update_url(),
            'id_field': self.id_field
        })
        data['fields'] = []
        for name, field in self.fields.items():
            field_data = field.to_dict(name=name, id_field='id-{}-{}'.format(self.form_name, name))
            data['fields'].append(field_data.copy())
        return data

    def is_valid(self):
        return True # Implement this

    def values(self, post_data):
        data = {}
        for name, field in self.fields.items():
            key = '{}-{}'.format(self.form_name, name)
            data[name] = field.get_value(post_data, key)
        return data
