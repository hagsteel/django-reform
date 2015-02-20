class ReformMixin(object):
    reform_classes = None
    form_context_name = 'reforms'

    def get_form_classes(self):
        return self.reform_classes

    def get_forms(self):
        return [f() for f in self.get_form_classes()]

    def get_context_data(self, **kwargs):
        context = super(ReformMixin, self).get_context_data(**kwargs)
        context[self.form_context_name] = self.get_forms()
        return context
