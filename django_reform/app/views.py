from django.views.generic import TemplateView
from django_reform.app.forms import FooForm, BarForm
from reform.views import ReformMixin


class FooView(ReformMixin, TemplateView):
    # reform_classes = [FooForm, BarForm]
    reform_classes = [BarForm]
