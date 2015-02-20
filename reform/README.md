# About

Render forms using ReactJS.

# TODO

*  Replace the REST.js with the npm one


## Urls

There are two urls, one for create and one for update

**create**

*  `create_url_name`: this will reverse the url name
*  `create_url`: this is a plain url, returned by `get_url`
*  `get_create_url`: override this function if neither of the properties are suitable (e.g in case of an external url)

**update**

*  `update_url_name`: this will reverse the url name
*  `update_url`: this is a plain url, returned by `get_url`
*  `get_update_url`: override this function if neither of the properties are suitable (e.g in case of an external url)

If the `update_url` contains '<id>', this will be replaced by the id field specified on the form.
E.g: /api/post/<id>/  will reutrn /api/post/1/ (assuming id = 1)

## Id field

The form will use `id` by default. This field is used to pass the id in the `update_url`.


## Fields

## DateTimeField

The default `format` is 'dd/mm/yyyy HH:mm'.

To change the format either pass `DateTimeField(format='my format', *args, **kwargs)` or specify the setting `REFORM_DATE_TIME='my format'`


## DateField

The default `format` is 'dd/mm/yyyy'.

To change the format either pass `DateField(format='my format', *args, **kwargs)` or specify the setting `REFORM_DATE='my format'`


## TimeField

The default `format` is 'HH:mm'.

To change the format either pass `TimeField(format='my format', *args, **kwargs)` or specify the setting `REFORM_TIME='my format'`


## ChoiceField

*  `choices` can be either a list, a dictionary, a url name, or a url
*  `key_field` is used to select which field in a list of dictionaries that represents the key (e.g 'id') 
*  `label_field` represents which field in a list of dictionaries to show 

Using key and label fields:
    
    
    choices = [
        {'name': 'Veronica', 'age': 1, 'id': 53},
        {'name': 'John', 'age': 58, 'id': 54},
    ]
    key_field = 'id'
    label_field = 'name'


This would render a select box showing the names as options, and each option would have the corresponding id as it's value

If `choices` is a list, then `key_field` and `label_field` are ignored. This is also the case if `choices` is a url that returns a list rather than a dictionary.
