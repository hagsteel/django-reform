from django.http import HttpResponseRedirect


class ReformMixin(object):
    reform_classes = None
    form_context_name = 'reforms'

    def __init__(self, *args, **kwargs):
        self.data = {}
        super(ReformMixin, self).__init__(*args, **kwargs)

    def get_form_classes(self):
        return self.reform_classes

    def get_forms(self):
        if not hasattr(self, 'forms'):
            self.forms = [f() for f in self.get_form_classes()]
        return self.forms

    def get_context_data(self, **kwargs):
        context = super(ReformMixin, self).get_context_data(**kwargs)
        context[self.form_context_name] = self.get_forms()
        return context

    def load_forms_data(self, request):
        forms = self.get_forms()
        for form in forms:
            data = {}
            for name, field in form.fields.items():
                data_name = '{}-{}'.format(form.form_name, name)
                data[name] = request.POST.get(data_name)
            self.data[form.form_name] = data

        is_valid = True
        for form in forms:
            if not form.is_valid():
                is_valid = False

        if is_valid:
            self.forms_valid()
        else:
            self.forms_invalid()

    def forms_valid(self):
        pass

    def forms_invalid(self):
        pass

    def form_data(self, form_name):
        return self.data.get(form_name)

    def post(self, request, *args, **kwargs):
        self.load_forms_data(request)
        if hasattr(self, 'post'):
            return super(ReformMixin, self).post(request, *args, **kwargs)
        return HttpResponseRedirect(self.get_success_url())

    def get_success_url(self):
        raise NotImplementedError()
