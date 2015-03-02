from django.conf.urls import patterns, include, url
from django.contrib import admin
from django_reform.app.views import FooView

urlpatterns = patterns('',
    url(r'^$', FooView.as_view(template_name='index.html'), name='home'),

    url(r'^admin/', include(admin.site.urls)),
)
