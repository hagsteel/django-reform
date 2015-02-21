class Validator(object):
    def __init__(self):
        self.name = None
        self.data = {}

    def __str__(self):
        return self.name

    def __unicode__(self):
        return self.__str__()

    def __repr__(self):
        return '<{}: {}>'.format(self.__class__.__name__, self.__str__())

    def to_dict(self):
        self.data['name'] = self.name
        return self.data


class MaxLengthValidator(Validator):
    def __init__(self, max_length):
        super(MaxLengthValidator, self).__init__()
        self.name = 'max_length'
        self.data['max_length'] = max_length


class MaxValueValidator(Validator):

    def __init__(self, max_value):
        super(MaxValueValidator, self).__init__()
        self.name = 'max_value'
        self.data['max_value'] = max_value


class MinValueValidator(Validator):

    def __init__(self, min_value):
        super(MinValueValidator, self).__init__()
        self.name = 'min_value'
        self.data['min_value'] = min_value


class EmailValidator(MaxLengthValidator):
    def __init__(self, max_length):
        super(EmailValidator, self).__init__(max_length)
        self.name = 'email'


class URLValidator(MaxLengthValidator):
    def __init__(self, max_length):
        super(URLValidator, self).__init__(max_length)
        self.name = 'url'
