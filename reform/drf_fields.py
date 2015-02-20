from .fields import CharField, BooleanField, EmailField, URLField, IntegerField, DecimalField, DateTimeField, DateField, TimeField, TextField, ChoiceField

try:
    from rest_framework import fields
    from rest_framework import compat
except ImportError:
    pass  # DRF is not installed


def drf_field_to_field(drf_field):
    kwargs = {}
    kwargs['required'] = drf_field.required
    kwargs['initial'] = drf_field.initial
    kwargs['label'] = drf_field.label
    kwargs['help_text'] = drf_field.help_text

    for validator in drf_field.validators:
        if isinstance(validator, compat.MaxLengthValidator):
            kwargs['max_length'] = validator.limit_value

    if isinstance(drf_field, fields.EmailField):
        return EmailField(**kwargs)

    if isinstance(drf_field, fields.ChoiceField):
        kwargs['choices'] = drf_field.choices
        return ChoiceField(**kwargs)

    if isinstance(drf_field, fields.URLField):
        return URLField(**kwargs)

    if isinstance(drf_field, fields.IntegerField):
        return IntegerField(**kwargs)

    if isinstance(drf_field, fields.DecimalField):
        return DecimalField(**kwargs)

    if isinstance(drf_field, fields.BooleanField):
        return BooleanField(**kwargs)

    if isinstance(drf_field, fields.DateTimeField):
        return DateTimeField(**kwargs)

    if isinstance(drf_field, fields.DateField):
        return DateField(**kwargs)

    if isinstance(drf_field, fields.TimeField):
        return TimeField(**kwargs)

    if isinstance(drf_field, fields.CharField):
        if 'max_length' not in kwargs:
            # If there is no max length then
            # this is probably a text field
            return TextField(**kwargs)
        return CharField(**kwargs)


    return None
