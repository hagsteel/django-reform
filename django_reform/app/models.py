from django.db import models


class Foo(models.Model):
    CHOICES = (
        (1, 'One'),
        (2, 'Two'),
        (3, 'Three'),
    )

    name = models.CharField(max_length=10)
    # description = models.TextField()
    # email = models.EmailField()
    # website = models.URLField()
    # is_true = models.BooleanField()
    # number = models.IntegerField()
    # choose = models.CharField(choices=CHOICES, max_length=100)
    # datetime = models.DateTimeField()
    # date = models.DateField()
    # time = models.TimeField()
    dec = models.DecimalField(max_digits=10, decimal_places=5)
