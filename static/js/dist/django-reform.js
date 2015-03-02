!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.djangoReform=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/Users/jonas/Projects/Django/django_reform/static/js/node_modules/django-reform/src/components/field.js":[function(require,module,exports){
var React = require('react');
var templateManager = require('../template-manager.js');


// Load default field templates
var CharField = require('./widgets/templates/char_field.js');
var TextField = require('./widgets/templates/text_field.js');
var EmailField = require('./widgets/templates/email_field.js');
var URLField = require('./widgets/templates/url_field.js');
var BooleanField = require('./widgets/templates/boolean_field.js');
var IntegerField = require('./widgets/templates/integer_field.js');
var DecimalField = require('./widgets/templates/decimal_field.js');
var DateTimeField = require('./widgets/templates/datetime_field.js');
var DateField = require('./widgets/templates/date_field.js');
var TimeField = require('./widgets/templates/time_field.js');
var SelectField = require('./widgets/templates/select_field.js');
var RadioSelectField = require('./widgets/templates/radio_select_field.js');


// Register default field templates
templateManager.registerFieldTemplate('char', CharField);
templateManager.registerFieldTemplate('text', TextField);
templateManager.registerFieldTemplate('email', EmailField);
templateManager.registerFieldTemplate('url', URLField);
templateManager.registerFieldTemplate('boolean', BooleanField);
templateManager.registerFieldTemplate('integer', IntegerField);
templateManager.registerFieldTemplate('decimal', DecimalField);
templateManager.registerFieldTemplate('date_time', DateTimeField);
templateManager.registerFieldTemplate('date', DateField);
templateManager.registerFieldTemplate('time', TimeField);
templateManager.registerFieldTemplate('select', SelectField);
templateManager.registerFieldTemplate('radio_select', RadioSelectField);


},{"../template-manager.js":"/Users/jonas/Projects/Django/django_reform/static/js/node_modules/django-reform/src/template-manager.js","./widgets/templates/boolean_field.js":"/Users/jonas/Projects/Django/django_reform/static/js/node_modules/django-reform/src/components/widgets/templates/boolean_field.js","./widgets/templates/char_field.js":"/Users/jonas/Projects/Django/django_reform/static/js/node_modules/django-reform/src/components/widgets/templates/char_field.js","./widgets/templates/date_field.js":"/Users/jonas/Projects/Django/django_reform/static/js/node_modules/django-reform/src/components/widgets/templates/date_field.js","./widgets/templates/datetime_field.js":"/Users/jonas/Projects/Django/django_reform/static/js/node_modules/django-reform/src/components/widgets/templates/datetime_field.js","./widgets/templates/decimal_field.js":"/Users/jonas/Projects/Django/django_reform/static/js/node_modules/django-reform/src/components/widgets/templates/decimal_field.js","./widgets/templates/email_field.js":"/Users/jonas/Projects/Django/django_reform/static/js/node_modules/django-reform/src/components/widgets/templates/email_field.js","./widgets/templates/integer_field.js":"/Users/jonas/Projects/Django/django_reform/static/js/node_modules/django-reform/src/components/widgets/templates/integer_field.js","./widgets/templates/radio_select_field.js":"/Users/jonas/Projects/Django/django_reform/static/js/node_modules/django-reform/src/components/widgets/templates/radio_select_field.js","./widgets/templates/select_field.js":"/Users/jonas/Projects/Django/django_reform/static/js/node_modules/django-reform/src/components/widgets/templates/select_field.js","./widgets/templates/text_field.js":"/Users/jonas/Projects/Django/django_reform/static/js/node_modules/django-reform/src/components/widgets/templates/text_field.js","./widgets/templates/time_field.js":"/Users/jonas/Projects/Django/django_reform/static/js/node_modules/django-reform/src/components/widgets/templates/time_field.js","./widgets/templates/url_field.js":"/Users/jonas/Projects/Django/django_reform/static/js/node_modules/django-reform/src/components/widgets/templates/url_field.js","react":"react"}],"/Users/jonas/Projects/Django/django_reform/static/js/node_modules/django-reform/src/components/form.js":[function(require,module,exports){
require('./field');
var React = require('react');
var formManager = require('../form-manager');
var templateManager = require('../template-manager');
var validation = require('../validation');


var DefaultTemplate = React.createClass({displayName: "DefaultTemplate",
    render: function () {
        var _this = this;
        return (
            React.createElement("div", null, 
                this.props.children.map(function (f, i) {
                    var Template = templateManager.getFieldTemplate(f.field.field_type);
                    return React.createElement(Template, {key: f.key, field: f.field, errors: _this.props.errors[f.field.name]})
                }), 
                React.createElement("button", {type: "submit"}, "save")
            )
        )
    }
});


var ReForm = React.createClass({displayName: "ReForm",
    getInitialState: function () {
        return {
            errors:{},
            form: formManager.getForm(this.props.form),
            template: templateManager.getFormTemplate(this.props.form) || DefaultTemplate
        }
    },

    componentWillMount: function () {
        var fields = [];
        var _this = this;
        this.state.form.fields.map(function (field, i) {
            var fieldTemplate = templateManager.getFieldTemplate(field.field_type);
            if (fieldTemplate)
                fields.push({
                    field: field,
                    key: "field-" + i,
                    ref: field.name
                });
        });

        this.setState({fields:fields});
    },

    formData: function (form) {
        var data = {},
            fields = this.state.form.fields,
            i, j, field, input, value;

        for (i = 0; i < fields.length; i += 1) {
            field = fields[i];
            inputs = form.querySelectorAll('[name="' + field.name + '"]')
            if (inputs.length === 1) {
                input = inputs[0]
            } else {
                for (j = 0; j < inputs.length; j += 1) {
                    if (inputs[j].type === "radio" && inputs[j].checked) {
                        input = inputs[j];
                        break;
                    }
                }
            }
            if (input) {
                value = input.value;
                if (input.type === "checkbox") {
                    value = input.checked;
                }
                data[field.name] = value;
            }
        }

        return data;
    },

    clear: function () {
        this.getDOMNode().reset();
    },

    error: function (errors) {
        this.setState({errors: errors});
    },

    validate: function (data) {
        var fields = this.state.form.fields,
            errors = null,
            messages,
            i, field, value;

        for (i = 0; i < fields.length; i += 1) {
            field = fields[i];
            value = data[field.name];
            messages = validation.validate(field, value);
            if (messages.length > 0) {
                errors = errors || {};
                errors[field.name] = messages
            }
        }

        if (errors)
            this.error(errors);
    },

    onsubmit: function (e) {
        e.preventDefault();
        var form = e.target;

        // Reset error state
        this.setState({errors: {}});

        // Get form data
        var data = this.formData(form);
        console.log(data);

        // Validate input
        var errors = this.validate(data);

        // Call parent onSubmit
        // if it's available
        if ('onsubmit' in this.props)
            this.props.onsubmit();
    },

    render: function () {
        var Template = this.state.template;
        return (
            React.createElement("form", {onSubmit: this.onsubmit}, 
                React.createElement(Template, {ref: "form", errors: this.state.errors, children: this.state.fields})
            )
        )
    }
});


module.exports = ReForm;


},{"../form-manager":"/Users/jonas/Projects/Django/django_reform/static/js/node_modules/django-reform/src/form-manager.js","../template-manager":"/Users/jonas/Projects/Django/django_reform/static/js/node_modules/django-reform/src/template-manager.js","../validation":"/Users/jonas/Projects/Django/django_reform/static/js/node_modules/django-reform/src/validation.js","./field":"/Users/jonas/Projects/Django/django_reform/static/js/node_modules/django-reform/src/components/field.js","react":"react"}],"/Users/jonas/Projects/Django/django_reform/static/js/node_modules/django-reform/src/components/widgets/templates/base_error_list.js":[function(require,module,exports){
var React = require('react');

var ErrorList = React.createClass({displayName: "ErrorList",
    render: function () {
        if (this.props.errors && this.props.errors.length > 0) {
            return (
                React.createElement("ul", null, 
                this.props.errors.map(function (error, i) {
                    return React.createElement("li", {key: "err-" + i}, error)
                })
                )
            )
        }

        return React.createElement("span", null)
    }
});


module.exports = ErrorList;


},{"react":"react"}],"/Users/jonas/Projects/Django/django_reform/static/js/node_modules/django-reform/src/components/widgets/templates/base_text_input.js":[function(require,module,exports){
var React = require('react');

var Input = React.createClass({displayName: "Input",
    render: function () {
        var props = {};
        if (this.props.step) {
            props.step = this.props.step;
        }
        if (this.props.field.required) {
            props.required = ''
        }

        return React.createElement("input", React.__spread({
            type: this.props.type, 
            name: this.props.field.name, 
            id: this.props.field.id_field, 
            defaultValue: this.props.value}, 
            props)
        )
    }
});

module.exports = Input

},{"react":"react"}],"/Users/jonas/Projects/Django/django_reform/static/js/node_modules/django-reform/src/components/widgets/templates/boolean_field.js":[function(require,module,exports){
var React = require('react');
var Input = require('./base_text_input');
var ErrorList = require('./base_error_list');


module.exports = React.createClass({displayName: "exports",
    render: function () {
        return (
            React.createElement("div", null, 
                React.createElement("label", {htmlFor: this.props.field.id_field}, this.props.field.label), 
                React.createElement(Input, {type: "checkbox", field: this.props.field}), 
                React.createElement("div", null, this.props.field.help_text), 
                React.createElement(ErrorList, {errors: this.props.errors})
            )
        )
    }
});


},{"./base_error_list":"/Users/jonas/Projects/Django/django_reform/static/js/node_modules/django-reform/src/components/widgets/templates/base_error_list.js","./base_text_input":"/Users/jonas/Projects/Django/django_reform/static/js/node_modules/django-reform/src/components/widgets/templates/base_text_input.js","react":"react"}],"/Users/jonas/Projects/Django/django_reform/static/js/node_modules/django-reform/src/components/widgets/templates/char_field.js":[function(require,module,exports){
var React = require('react');
var Input = require('./base_text_input');
var ErrorList = require('./base_error_list');


module.exports = React.createClass({displayName: "exports",
    render: function () {
        return (
            React.createElement("div", null, 
                React.createElement("label", {htmlFor: this.props.field.id_field}, this.props.field.label), 
                React.createElement(Input, {type: "text", field: this.props.field}), 
                React.createElement("div", null, this.props.field.help_text), 
                React.createElement(ErrorList, {errors: this.props.errors})
            )
        )
    }
});


},{"./base_error_list":"/Users/jonas/Projects/Django/django_reform/static/js/node_modules/django-reform/src/components/widgets/templates/base_error_list.js","./base_text_input":"/Users/jonas/Projects/Django/django_reform/static/js/node_modules/django-reform/src/components/widgets/templates/base_text_input.js","react":"react"}],"/Users/jonas/Projects/Django/django_reform/static/js/node_modules/django-reform/src/components/widgets/templates/date_field.js":[function(require,module,exports){
var React = require('react');
var Input = require('./base_text_input');
var ErrorList = require('./base_error_list');


module.exports = React.createClass({displayName: "exports",
    render: function () {
        return (
            React.createElement("div", null, 
                React.createElement("label", {htmlFor: this.props.field.id_field}, this.props.field.label), 
                React.createElement(Input, {type: "date", field: this.props.field}), 
                React.createElement("div", null, this.props.field.help_text), 
                React.createElement(ErrorList, {errors: this.props.errors})
            )
        )
    }
});


},{"./base_error_list":"/Users/jonas/Projects/Django/django_reform/static/js/node_modules/django-reform/src/components/widgets/templates/base_error_list.js","./base_text_input":"/Users/jonas/Projects/Django/django_reform/static/js/node_modules/django-reform/src/components/widgets/templates/base_text_input.js","react":"react"}],"/Users/jonas/Projects/Django/django_reform/static/js/node_modules/django-reform/src/components/widgets/templates/datetime_field.js":[function(require,module,exports){
var React = require('react');
var Input = require('./base_text_input');
var ErrorList = require('./base_error_list');


module.exports = React.createClass({displayName: "exports",
    render: function () {
        return (
            React.createElement("div", null, 
                React.createElement("label", {htmlFor: this.props.field.id_field}, this.props.field.label), 
                React.createElement(Input, {type: "datetime-local", field: this.props.field}), 
                React.createElement("div", null, this.props.field.help_text), 
                React.createElement(ErrorList, {errors: this.props.errors})
            )
        )
    }
});


},{"./base_error_list":"/Users/jonas/Projects/Django/django_reform/static/js/node_modules/django-reform/src/components/widgets/templates/base_error_list.js","./base_text_input":"/Users/jonas/Projects/Django/django_reform/static/js/node_modules/django-reform/src/components/widgets/templates/base_text_input.js","react":"react"}],"/Users/jonas/Projects/Django/django_reform/static/js/node_modules/django-reform/src/components/widgets/templates/decimal_field.js":[function(require,module,exports){
var React = require('react');
var Input = require('./base_text_input');
var ErrorList = require('./base_error_list');


module.exports = React.createClass({displayName: "exports",
    decimalPlacesToSteps: function () {
        var decimalPlaces = this.props.field.decimal_places,
            i, result, decArray = [];

        if (decimalPlaces === null) {
            return "0.01";
        }

        if (decimalPlaces > 0) {
            for (i = 0; i < decimalPlaces; i += 1) {
                decArray.push("0");
            }
            decArray.splice(1, 0, ".");
        }
        decArray.push("1");
        result = decArray.join("");
        return result;
    },

    render: function () {
        var step = this.decimalPlacesToSteps();
        return (
            React.createElement("div", null, 
                React.createElement("label", {htmlFor: this.props.field.id_field}, this.props.field.label), 
                React.createElement(Input, {type: "number", step: step, field: this.props.field}), 
                React.createElement("div", null, this.props.field.help_text), 
                React.createElement(ErrorList, {errors: this.props.errors})
            )
        )
    }
});


},{"./base_error_list":"/Users/jonas/Projects/Django/django_reform/static/js/node_modules/django-reform/src/components/widgets/templates/base_error_list.js","./base_text_input":"/Users/jonas/Projects/Django/django_reform/static/js/node_modules/django-reform/src/components/widgets/templates/base_text_input.js","react":"react"}],"/Users/jonas/Projects/Django/django_reform/static/js/node_modules/django-reform/src/components/widgets/templates/email_field.js":[function(require,module,exports){
var React = require('react');
var Input = require('./base_text_input');
var ErrorList = require('./base_error_list');


module.exports = React.createClass({displayName: "exports",
    render: function () {
        return (
            React.createElement("div", null, 
                React.createElement("label", {htmlFor: this.props.field.id_field}, this.props.field.label), 
                React.createElement(Input, {type: "email", field: this.props.field}), 
                React.createElement("div", null, this.props.field.help_text), 
                React.createElement(ErrorList, {errors: this.props.errors})
            )
        )
    }
});


},{"./base_error_list":"/Users/jonas/Projects/Django/django_reform/static/js/node_modules/django-reform/src/components/widgets/templates/base_error_list.js","./base_text_input":"/Users/jonas/Projects/Django/django_reform/static/js/node_modules/django-reform/src/components/widgets/templates/base_text_input.js","react":"react"}],"/Users/jonas/Projects/Django/django_reform/static/js/node_modules/django-reform/src/components/widgets/templates/integer_field.js":[function(require,module,exports){
var React = require('react');
var Input = require('./base_text_input');
var ErrorList = require('./base_error_list');


module.exports = React.createClass({displayName: "exports",
    render: function () {
        return (
            React.createElement("div", null, 
                React.createElement("label", {htmlFor: this.props.field.id_field}, this.props.field.label), 
                React.createElement(Input, {type: "number", field: this.props.field}), 
                React.createElement("div", null, this.props.field.help_text), 
                React.createElement(ErrorList, {errors: this.props.errors})
            )
        )
    }
});


},{"./base_error_list":"/Users/jonas/Projects/Django/django_reform/static/js/node_modules/django-reform/src/components/widgets/templates/base_error_list.js","./base_text_input":"/Users/jonas/Projects/Django/django_reform/static/js/node_modules/django-reform/src/components/widgets/templates/base_text_input.js","react":"react"}],"/Users/jonas/Projects/Django/django_reform/static/js/node_modules/django-reform/src/components/widgets/templates/radio_select_field.js":[function(require,module,exports){
var React = require('react');
var ErrorList = require('./base_error_list');


module.exports = React.createClass({displayName: "exports",
    render: function () {
        var key_field = this.props.field.key_field;
        var label_field = this.props.field.label_field;

        var props = {};
        if (this.props.field.required) {
            props.required = 'required'
        }
        var field = this.props.field;
        return (
            React.createElement("div", null, field.label, 
                field.choices.map(function (choice, i) {
                    return (
                        React.createElement("label", {htmlFor: field.id_field + "_" + i, key: "label-" + i}, 
                            React.createElement("input", React.__spread({type: "radio", name: field.name, id: field.id_field + "_" + i, key: "opt-" + i, value: choice[key_field]},  props)), choice[label_field]
                        )
                    )
                }), 
                React.createElement("div", null, this.props.field.help_text), 
                React.createElement(ErrorList, {errors: this.props.errors})
            )
        )
    }
});


},{"./base_error_list":"/Users/jonas/Projects/Django/django_reform/static/js/node_modules/django-reform/src/components/widgets/templates/base_error_list.js","react":"react"}],"/Users/jonas/Projects/Django/django_reform/static/js/node_modules/django-reform/src/components/widgets/templates/select_field.js":[function(require,module,exports){
var React = require('react');
var ErrorList = require('./base_error_list');


module.exports = React.createClass({displayName: "exports",
    render: function () {
        var key_field = this.props.field.key_field;
        var label_field = this.props.field.label_field;

        var props = {};
        if (this.props.field.required) {
            props.required = 'required'
        }

        return (
            React.createElement("div", null, 
                React.createElement("label", {htmlFor: this.props.field.id_field}, this.props.field.label), 
                React.createElement("select", React.__spread({name: this.props.field.name, id: this.props.field.id_field},  props), 
                this.props.field.choices.map(function (choice, i) {
                    return React.createElement("option", {key: "opt-" + i, value: choice[key_field]}, choice[label_field])
                })
                ), 
                React.createElement("div", null, this.props.field.help_text), 
                React.createElement(ErrorList, {errors: this.props.errors})
            )
        )
    }
});


},{"./base_error_list":"/Users/jonas/Projects/Django/django_reform/static/js/node_modules/django-reform/src/components/widgets/templates/base_error_list.js","react":"react"}],"/Users/jonas/Projects/Django/django_reform/static/js/node_modules/django-reform/src/components/widgets/templates/text_field.js":[function(require,module,exports){
var React = require('react');
var ErrorList = require('./base_error_list');


module.exports = React.createClass({displayName: "exports",
    render: function () {
        return (
            React.createElement("div", null, 
                React.createElement("label", {htmlFor: this.props.field.id_field}, this.props.field.label), 
                React.createElement("textarea", {name: this.props.field.name, id: this.props.field.id_field}), 
                React.createElement("div", null, this.props.field.help_text), 
                React.createElement(ErrorList, {errors: this.props.errors})
            )
        )
    }
});


},{"./base_error_list":"/Users/jonas/Projects/Django/django_reform/static/js/node_modules/django-reform/src/components/widgets/templates/base_error_list.js","react":"react"}],"/Users/jonas/Projects/Django/django_reform/static/js/node_modules/django-reform/src/components/widgets/templates/time_field.js":[function(require,module,exports){
var React = require('react');
var Input = require('./base_text_input');
var ErrorList = require('./base_error_list');


module.exports = React.createClass({displayName: "exports",
    render: function () {
        return (
            React.createElement("div", null, 
                React.createElement("label", {htmlFor: this.props.field.id_field}, this.props.field.label), 
                React.createElement(Input, {type: "time", field: this.props.field}), 
                React.createElement("div", null, this.props.field.help_text), 
                React.createElement(ErrorList, {errors: this.props.errors})
            )
        )
    }
});


},{"./base_error_list":"/Users/jonas/Projects/Django/django_reform/static/js/node_modules/django-reform/src/components/widgets/templates/base_error_list.js","./base_text_input":"/Users/jonas/Projects/Django/django_reform/static/js/node_modules/django-reform/src/components/widgets/templates/base_text_input.js","react":"react"}],"/Users/jonas/Projects/Django/django_reform/static/js/node_modules/django-reform/src/components/widgets/templates/url_field.js":[function(require,module,exports){
var React = require('react');
var Input = require('./base_text_input');
var ErrorList = require('./base_error_list');


module.exports = React.createClass({displayName: "exports",
    render: function () {
        return (
            React.createElement("div", null, 
                React.createElement("label", {htmlFor: this.props.field.id_field}, this.props.field.label), 
                React.createElement(Input, {type: "url", field: this.props.field}), 
                React.createElement("div", null, this.props.field.help_text), 
                React.createElement(ErrorList, {errors: this.props.errors})
            )
        )
    }
});


},{"./base_error_list":"/Users/jonas/Projects/Django/django_reform/static/js/node_modules/django-reform/src/components/widgets/templates/base_error_list.js","./base_text_input":"/Users/jonas/Projects/Django/django_reform/static/js/node_modules/django-reform/src/components/widgets/templates/base_text_input.js","react":"react"}],"/Users/jonas/Projects/Django/django_reform/static/js/node_modules/django-reform/src/form-manager.js":[function(require,module,exports){
var formManager = formManager || {};

var forms = {};

formManager.digestForms = function() {
    var key, form, formSelectorClass, targets;

    for (key in window.reforms) {
        form = window.reforms[key];
        forms[key] = form;
    }
};

formManager.getForm = function (name, opts) {
    var form = forms[name];
    opts = opts || {};
    var formKey = opts.key || "form-" + Date.now();
    var initial = opts.initial;
    var create = opts.create;
    var update = opts.update;
    var parent = opts.parent;
    return form;
};

formManager.digestForms();

module.exports = {
    getForm: formManager.getForm
};


},{}],"/Users/jonas/Projects/Django/django_reform/static/js/node_modules/django-reform/src/reform.js":[function(require,module,exports){
var ReForm = require('./components/form');
var TemplateManager = require('./template-manager');


module.exports = {
    ReForm: ReForm,
    TemplateManager: TemplateManager
};


},{"./components/form":"/Users/jonas/Projects/Django/django_reform/static/js/node_modules/django-reform/src/components/form.js","./template-manager":"/Users/jonas/Projects/Django/django_reform/static/js/node_modules/django-reform/src/template-manager.js"}],"/Users/jonas/Projects/Django/django_reform/static/js/node_modules/django-reform/src/template-manager.js":[function(require,module,exports){
"use strict";

var forms = {};
var fields = {};
var templates = {};
var templateManager = templateManager || { };


templateManager.registerFormTemplate = function (name, template) {
    forms[name] = template;
};

templateManager.getFormTemplate = function (name) {
    return forms[name];
};


templateManager.registerFieldTemplate = function (fieldType, template) {
    fields[fieldType] = template;
};


templateManager.getFieldTemplate = function(fieldType) {
    return fields[fieldType];
};


templateManager.registerTemplate = function (name, template) {
    templates[name] = template;
};


templateManager.getTemplate = function (name) {
    return templates[name];
};


templateManager.meh = function (){
    return forms;
};

module.exports = templateManager;


},{}],"/Users/jonas/Projects/Django/django_reform/static/js/node_modules/django-reform/src/validation.js":[function(require,module,exports){
function validateMaxLength (value, args) {
    if (value.length > args.max_length)
        return "Can't be longer than " + args.max_length + " characters";
    return null;
}


function validateEmail(value, args) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!re.test(value))
        return "Invalid email";
    return null;
}


function validateUrl(value, args) {
    var re = /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i;
    if (!re.test(value))
        return "Invalid url";
    return null;
}


function validateMinValue (value, args) {
    if (value < args.min_value)
        return "Needs to be at least " + args.min_value;
    return null;
}


function validateMaxValue (value, args) {
    if (value > args.max_value)
        return "Can't be more than " + args.max_value;
    return null;
}


var validators = {
    max_length: validateMaxLength,
    email: validateEmail,
    url: validateUrl,
    min_value: validateMinValue,
    max_value: validateMaxValue
};


function validate (field, value) {
    var i, validationArgs, validator, error, errorMessages = [];

    for (i = 0; i < field.validators.length; i += 1) {
        validationArgs = field.validators[i];
        validator = validators[validationArgs.name];
        error = validator(value, validationArgs);
        if (error) {
            if (field.error_messages && validationArgs.name in field.error_messages) {
                errorMessages.push(field.error_messages[validationArgs.name]);
            } else {
                errorMessages.push(error);
            }
        }
    }

    return errorMessages;
}


module.exports = {
    validate: validate
};


},{}],"django-reform":[function(require,module,exports){
var reform = require('./src/reform');
module.exports = reform;


},{"./src/reform":"/Users/jonas/Projects/Django/django_reform/static/js/node_modules/django-reform/src/reform.js"}]},{},[])("django-reform")
});