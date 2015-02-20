from unittest import TestCase
from django.core.urlresolvers import NoReverseMatch
from ..form import ReactForm


class FooForm(ReactForm):
    form_name = 'foo-form'
    create_url_name = 'test_url'
    update_url_name = 'test_url'


class BarForm(ReactForm):
    form_name = 'bar-form'
    create_url = '/test/'
    update_url = '/test/'


class ReactFormTest(TestCase):
    def test_get_url_by_name(self):
        form = FooForm()
        with self.assertRaises(NoReverseMatch):
            form.get_create_url()

    def test_get_url_by_url(self):
        form = BarForm()
        self.assertEqual(form.get_create_url(), '/test/')
