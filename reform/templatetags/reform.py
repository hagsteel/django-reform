from django import template
from django.conf import settings
import json

register = template.Library()
_template_cache = {}


@register.inclusion_tag('formwrapper.html', takes_context=True)
def reform(context, forms):
    rendered_form_list = []
    for form in forms:
        if settings.DEBUG:
            output = json.dumps(form.to_dict(), indent=4)
        else:
            output = json.dumps(form.to_dict())
        rendered_form_list.append({
            'form_json': output,
            'form_name': form.form_name
        })
    return {'forms': rendered_form_list}
