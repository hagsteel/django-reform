(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/Users/jonas/Projects/Django/django_reform/reform/static/js/index.js":[function(require,module,exports){
module.exports = require('./src/reform');


},{"./src/reform":"/Users/jonas/Projects/Django/django_reform/reform/static/js/src/reform.js"}],"/Users/jonas/Projects/Django/django_reform/reform/static/js/src/components/field.js":[function(require,module,exports){
var React = require('react');
var templateManager = require('../template-manager.js');


// Load default field templates
var Input = require('./widgets/templates/base_text_input.js');
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
var Button = require('./widgets/templates/button.js');


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
templateManager.registerFieldTemplate('button', Button);


module.exports = {
    Input: Input,
    CharField: CharField,
    TextField: TextField,
    EmailField: EmailField,
    URLField: URLField,
    BooleanField: BooleanField,
    IntegerField: IntegerField,
    DecimalField: DecimalField,
    DateTimeField: DateTimeField,
    DateField: DateField,
    TimeField: TimeField,
    SelectField: SelectField,
    RadioSelectField: RadioSelectField,
    Button: Button,
    mixins: require('./widgets/mixins')
};

},{"../template-manager.js":"/Users/jonas/Projects/Django/django_reform/reform/static/js/src/template-manager.js","./widgets/mixins":"/Users/jonas/Projects/Django/django_reform/reform/static/js/src/components/widgets/mixins.js","./widgets/templates/base_text_input.js":"/Users/jonas/Projects/Django/django_reform/reform/static/js/src/components/widgets/templates/base_text_input.js","./widgets/templates/boolean_field.js":"/Users/jonas/Projects/Django/django_reform/reform/static/js/src/components/widgets/templates/boolean_field.js","./widgets/templates/button.js":"/Users/jonas/Projects/Django/django_reform/reform/static/js/src/components/widgets/templates/button.js","./widgets/templates/char_field.js":"/Users/jonas/Projects/Django/django_reform/reform/static/js/src/components/widgets/templates/char_field.js","./widgets/templates/date_field.js":"/Users/jonas/Projects/Django/django_reform/reform/static/js/src/components/widgets/templates/date_field.js","./widgets/templates/datetime_field.js":"/Users/jonas/Projects/Django/django_reform/reform/static/js/src/components/widgets/templates/datetime_field.js","./widgets/templates/decimal_field.js":"/Users/jonas/Projects/Django/django_reform/reform/static/js/src/components/widgets/templates/decimal_field.js","./widgets/templates/email_field.js":"/Users/jonas/Projects/Django/django_reform/reform/static/js/src/components/widgets/templates/email_field.js","./widgets/templates/integer_field.js":"/Users/jonas/Projects/Django/django_reform/reform/static/js/src/components/widgets/templates/integer_field.js","./widgets/templates/radio_select_field.js":"/Users/jonas/Projects/Django/django_reform/reform/static/js/src/components/widgets/templates/radio_select_field.js","./widgets/templates/select_field.js":"/Users/jonas/Projects/Django/django_reform/reform/static/js/src/components/widgets/templates/select_field.js","./widgets/templates/text_field.js":"/Users/jonas/Projects/Django/django_reform/reform/static/js/src/components/widgets/templates/text_field.js","./widgets/templates/time_field.js":"/Users/jonas/Projects/Django/django_reform/reform/static/js/src/components/widgets/templates/time_field.js","./widgets/templates/url_field.js":"/Users/jonas/Projects/Django/django_reform/reform/static/js/src/components/widgets/templates/url_field.js","react":"react"}],"/Users/jonas/Projects/Django/django_reform/reform/static/js/src/components/form.js":[function(require,module,exports){
require('./field');
var React = require('react');
var formManager = require('../form-manager');
var TemplateManager = require('../template-manager');
var validation = require('../validation');


var ReForm = React.createClass({displayName: "ReForm",
    getInitialState: function () {
        return {
            errors:{},
            form: formManager.getForm(this.props.form),
            template: TemplateManager.getFormTemplate(this.props.form),
            fields: null
        }
    },

    componentWillMount: function () {
        if (this.state.form === undefined) {
            return;
        }

        var fields = [],
            _this = this,
            instance = null;

        if (this.props.instance) {
            instance = this.props.instance
        }

        this.state.form.fields.map(function (field, i) {
            field.initial = instance != null ? instance[field.name] : field.initial;
            field.prefix = _this.state.form.name;

            var fieldTemplate = TemplateManager.getFieldTemplate(field.field_type, _this.props.fieldPrefix);

            if (fieldTemplate)
                fields.push({
                    field: field,
                    key: "field-" + i,
                    ref: field.name,
                    templatePrefix: _this.props.fieldPrefix
                });
        });

        this.setState({fields:fields});
    },

    getFieldName: function(name) {
        return this.state.form.name + "-" + name;
    },

    formData: function (form) {
        if (this.state.form === undefined) {
            return;
        }

        var data = {},
            fields = this.state.form.fields,
            i, j, field, input, value;

        for (i = 0; i < fields.length; i += 1) {
            field = fields[i];
            inputs = form.querySelectorAll('[name="' + this.getFieldName(field.name) + '"]')
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

        if (this.props.hasOwnProperty("instance") && this.props.instance) {
            var id_field = this.state.form.id_field;
            data[id_field] = this.props.instance[id_field];
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
        if (this.state.form === undefined) {
            return;
        }

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

        // Validate input
        var errors = this.validate(data);

        // Call parent onSubmit
        // if it's available
        if ('onsubmit' in this.props)
            this.props.onsubmit(data, this.formUrls());
    },

    formUrls: function () {
        if (this.state.form === undefined) {
            return null;
        }
        return {
            create: this.state.form.create_url,
            update: this.state.form.update_url
        }
    },

    render: function () {
        var Template = this.state.template;
        if (this.props.formless) {
            return (
                React.createElement(Template, {ref: "form", errors: this.state.errors, fields: this.state.fields}, 
                this.props.children
                )
            )
        }

        return (
            React.createElement("form", {onSubmit: this.onsubmit, className: this.props.className}, 
                React.createElement(Template, {ref: "form", errors: this.state.errors, fields: this.state.fields}, 
                this.props.children
                )
            )
        )
    }
});


module.exports = ReForm;


},{"../form-manager":"/Users/jonas/Projects/Django/django_reform/reform/static/js/src/form-manager.js","../template-manager":"/Users/jonas/Projects/Django/django_reform/reform/static/js/src/template-manager.js","../validation":"/Users/jonas/Projects/Django/django_reform/reform/static/js/src/validation.js","./field":"/Users/jonas/Projects/Django/django_reform/reform/static/js/src/components/field.js","react":"react"}],"/Users/jonas/Projects/Django/django_reform/reform/static/js/src/components/widgets/mixins.js":[function(require,module,exports){
var InputMixin = {
    getFieldName: function () {
        var fieldName = this.props.field.prefix + "-" + this.props.field.name;
        return fieldName;
    }
};

module.exports = {
    InputMixin: InputMixin
};


},{}],"/Users/jonas/Projects/Django/django_reform/reform/static/js/src/components/widgets/templates/base_error_list.js":[function(require,module,exports){
var React = require('react');

var ErrorList = React.createClass({displayName: "ErrorList",
    render: function () {
        if (this.props.errors && this.props.errors.length > 0) {
            var errors = this.props.errors;
            if (!(errors instanceof Array)) {
                errors = [errors];
            }

            return (
                React.createElement("ul", null, 
                errors.map(function (error, i) {
                    return React.createElement("li", {key: "err-" + i}, error)
                })
                )
            )
        }

        return React.createElement("span", null)
    }
});


module.exports = ErrorList;


},{"react":"react"}],"/Users/jonas/Projects/Django/django_reform/reform/static/js/src/components/widgets/templates/base_text_input.js":[function(require,module,exports){
var React = require('react');
var InputMixin = require('../mixins').InputMixin;

var Input = React.createClass({displayName: "Input",
    mixins: [InputMixin],

    render: function () {
        var props = {};

        if (this.props.step) {
            props.step = this.props.step;
        }
        if (this.props.field.required) {
            props.required = "required";
        }

        if (this.props.className) {
            props.className = this.props.className;
        }

        var fieldName = this.props.field.prefix + "-" + this.props.field.name;

        return React.createElement("input", React.__spread({
            type: this.props.type, 
            name: fieldName, 
            id: this.props.field.id_field, 
            defaultValue: this.props.field.initial}, 
            props)
        )
    }
});

module.exports = Input

},{"../mixins":"/Users/jonas/Projects/Django/django_reform/reform/static/js/src/components/widgets/mixins.js","react":"react"}],"/Users/jonas/Projects/Django/django_reform/reform/static/js/src/components/widgets/templates/boolean_field.js":[function(require,module,exports){
var React = require('react');
var Input = require('./base_text_input');
var ErrorList = require('./base_error_list');


module.exports = React.createClass({displayName: "exports",
    render: function () {
        return (
            React.createElement("div", {className: "reform-field"}, 
                React.createElement("label", {htmlFor: this.props.field.id_field}, this.props.field.label), 
                React.createElement(Input, {type: "checkbox", field: this.props.field}), 
                React.createElement("div", null, this.props.field.help_text), 
                React.createElement(ErrorList, {errors: this.props.errors})
            )
        )
    }
});


},{"./base_error_list":"/Users/jonas/Projects/Django/django_reform/reform/static/js/src/components/widgets/templates/base_error_list.js","./base_text_input":"/Users/jonas/Projects/Django/django_reform/reform/static/js/src/components/widgets/templates/base_text_input.js","react":"react"}],"/Users/jonas/Projects/Django/django_reform/reform/static/js/src/components/widgets/templates/button.js":[function(require,module,exports){
var React = require('react');
var Input = require('./base_text_input');
var ErrorList = require('./base_error_list');


module.exports = React.createClass({displayName: "exports",
    render: function () {
        return (
            React.createElement("div", {className: "reform-field"}, 
                React.createElement("button", {defaultValue: this.props.field.initial, type: "submit"}, this.props.field.label)
            )
        )
    }
});


},{"./base_error_list":"/Users/jonas/Projects/Django/django_reform/reform/static/js/src/components/widgets/templates/base_error_list.js","./base_text_input":"/Users/jonas/Projects/Django/django_reform/reform/static/js/src/components/widgets/templates/base_text_input.js","react":"react"}],"/Users/jonas/Projects/Django/django_reform/reform/static/js/src/components/widgets/templates/char_field.js":[function(require,module,exports){
var React = require('react');
var Input = require('./base_text_input');
var ErrorList = require('./base_error_list');


module.exports = React.createClass({displayName: "exports",
    render: function () {
        return (
            React.createElement("div", {className: "reform-field"}, 
                React.createElement("label", {htmlFor: this.props.field.id_field}, this.props.field.label), 
                React.createElement(Input, {type: "text", field: this.props.field}), 
                React.createElement("div", null, this.props.field.help_text), 
                React.createElement(ErrorList, {errors: this.props.errors})
            )
        )
    }
});


},{"./base_error_list":"/Users/jonas/Projects/Django/django_reform/reform/static/js/src/components/widgets/templates/base_error_list.js","./base_text_input":"/Users/jonas/Projects/Django/django_reform/reform/static/js/src/components/widgets/templates/base_text_input.js","react":"react"}],"/Users/jonas/Projects/Django/django_reform/reform/static/js/src/components/widgets/templates/date_field.js":[function(require,module,exports){
var React = require('react');
var Input = require('./base_text_input');
var ErrorList = require('./base_error_list');


module.exports = React.createClass({displayName: "exports",
    render: function () {
        return (
            React.createElement("div", {className: "reform-field"}, 
                React.createElement("label", {htmlFor: this.props.field.id_field}, this.props.field.label), 
                React.createElement(Input, {type: "date", field: this.props.field}), 
                React.createElement("div", null, this.props.field.help_text), 
                React.createElement(ErrorList, {errors: this.props.errors})
            )
        )
    }
});


},{"./base_error_list":"/Users/jonas/Projects/Django/django_reform/reform/static/js/src/components/widgets/templates/base_error_list.js","./base_text_input":"/Users/jonas/Projects/Django/django_reform/reform/static/js/src/components/widgets/templates/base_text_input.js","react":"react"}],"/Users/jonas/Projects/Django/django_reform/reform/static/js/src/components/widgets/templates/datetime_field.js":[function(require,module,exports){
var React = require('react');
var Input = require('./base_text_input');
var ErrorList = require('./base_error_list');


module.exports = React.createClass({displayName: "exports",
    render: function () {
        return (
            React.createElement("div", {className: "reform-field"}, 
                React.createElement("label", {htmlFor: this.props.field.id_field}, this.props.field.label), 
                React.createElement(Input, {type: "datetime-local", field: this.props.field}), 
                React.createElement("div", null, this.props.field.help_text), 
                React.createElement(ErrorList, {errors: this.props.errors})
            )
        )
    }
});


},{"./base_error_list":"/Users/jonas/Projects/Django/django_reform/reform/static/js/src/components/widgets/templates/base_error_list.js","./base_text_input":"/Users/jonas/Projects/Django/django_reform/reform/static/js/src/components/widgets/templates/base_text_input.js","react":"react"}],"/Users/jonas/Projects/Django/django_reform/reform/static/js/src/components/widgets/templates/decimal_field.js":[function(require,module,exports){
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
            React.createElement("div", {className: "reform-field"}, 
                React.createElement("label", {htmlFor: this.props.field.id_field}, this.props.field.label), 
                React.createElement(Input, {type: "number", step: step, field: this.props.field}), 
                React.createElement("div", null, this.props.field.help_text), 
                React.createElement(ErrorList, {errors: this.props.errors})
            )
        )
    }
});


},{"./base_error_list":"/Users/jonas/Projects/Django/django_reform/reform/static/js/src/components/widgets/templates/base_error_list.js","./base_text_input":"/Users/jonas/Projects/Django/django_reform/reform/static/js/src/components/widgets/templates/base_text_input.js","react":"react"}],"/Users/jonas/Projects/Django/django_reform/reform/static/js/src/components/widgets/templates/email_field.js":[function(require,module,exports){
var React = require('react');
var Input = require('./base_text_input');
var ErrorList = require('./base_error_list');


module.exports = React.createClass({displayName: "exports",
    render: function () {
        return (
            React.createElement("div", {className: "reform-field"}, 
                React.createElement("label", {htmlFor: this.props.field.id_field}, this.props.field.label), 
                React.createElement(Input, {type: "email", field: this.props.field}), 
                React.createElement("div", null, this.props.field.help_text), 
                React.createElement(ErrorList, {errors: this.props.errors})
            )
        )
    }
});


},{"./base_error_list":"/Users/jonas/Projects/Django/django_reform/reform/static/js/src/components/widgets/templates/base_error_list.js","./base_text_input":"/Users/jonas/Projects/Django/django_reform/reform/static/js/src/components/widgets/templates/base_text_input.js","react":"react"}],"/Users/jonas/Projects/Django/django_reform/reform/static/js/src/components/widgets/templates/integer_field.js":[function(require,module,exports){
var React = require('react');
var Input = require('./base_text_input');
var ErrorList = require('./base_error_list');


module.exports = React.createClass({displayName: "exports",
    render: function () {
        return (
            React.createElement("div", {className: "reform-field"}, 
                React.createElement("label", {htmlFor: this.props.field.id_field}, this.props.field.label), 
                React.createElement(Input, {type: "number", field: this.props.field}), 
                React.createElement("div", null, this.props.field.help_text), 
                React.createElement(ErrorList, {errors: this.props.errors})
            )
        )
    }
});


},{"./base_error_list":"/Users/jonas/Projects/Django/django_reform/reform/static/js/src/components/widgets/templates/base_error_list.js","./base_text_input":"/Users/jonas/Projects/Django/django_reform/reform/static/js/src/components/widgets/templates/base_text_input.js","react":"react"}],"/Users/jonas/Projects/Django/django_reform/reform/static/js/src/components/widgets/templates/radio_select_field.js":[function(require,module,exports){
var React = require('react');
var ErrorList = require('./base_error_list');
var InputMixin = require('../mixins').InputMixin;


module.exports = React.createClass({displayName: "exports",
    mixins: [InputMixin],

    render: function () {
        var key_field = this.props.field.key_field;
        var label_field = this.props.field.label_field;

        var props = {};
        if (this.props.field.required) {
            props.required = 'required'
        }
        var field = this.props.field;
        return (
            React.createElement("div", {className: "reform-field"}, 
                field.label, 
                field.choices.map(function (choice, i) {
                    return (
                        React.createElement("label", {htmlFor: field.id_field + "_" + i, key: "label-" + i}, 
                            React.createElement("input", React.__spread({type: "radio", name: this.getFieldName(), id: field.id_field + "_" + i, key: "opt-" + i, value: choice[key_field]},  props)), choice[label_field]
                        )
                    )
                }), 
                React.createElement("div", null, this.props.field.help_text), 
                React.createElement(ErrorList, {errors: this.props.errors})
            )
        )
    }
});


},{"../mixins":"/Users/jonas/Projects/Django/django_reform/reform/static/js/src/components/widgets/mixins.js","./base_error_list":"/Users/jonas/Projects/Django/django_reform/reform/static/js/src/components/widgets/templates/base_error_list.js","react":"react"}],"/Users/jonas/Projects/Django/django_reform/reform/static/js/src/components/widgets/templates/select_field.js":[function(require,module,exports){
var React = require('react');
var ErrorList = require('./base_error_list');
var InputMixin = require('../mixins').InputMixin;


module.exports = React.createClass({displayName: "exports",
    mixins: [InputMixin],

    render: function () {
        var key_field = this.props.field.key_field;
        var label_field = this.props.field.label_field;

        var props = {};
        if (this.props.field.required) {
            props.required = 'required'
        }

        if (this.props.onChange) {
            props.onChange = this.props.onChange;
        }

        if (this.props.multi) {
            props.multiple = 'multiple';
        }

        return (
            React.createElement("div", {className: "reform-field"}, 
                React.createElement("label", {htmlFor: this.props.field.id_field}, this.props.field.label), 
                React.createElement("select", React.__spread({name: this.getFieldName(), id: this.props.field.id_field, defaultValue: this.props.field.initial},  props), 
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


},{"../mixins":"/Users/jonas/Projects/Django/django_reform/reform/static/js/src/components/widgets/mixins.js","./base_error_list":"/Users/jonas/Projects/Django/django_reform/reform/static/js/src/components/widgets/templates/base_error_list.js","react":"react"}],"/Users/jonas/Projects/Django/django_reform/reform/static/js/src/components/widgets/templates/text_field.js":[function(require,module,exports){
var React = require('react');
var ErrorList = require('./base_error_list');
var InputMixin = require('../mixins').InputMixin;


module.exports = React.createClass({displayName: "exports",
    mixins: [InputMixin],

    render: function () {
        return (
            React.createElement("div", {className: "reform-field"}, 
                React.createElement("label", {htmlFor: this.props.field.id_field}, this.props.field.label), 
                React.createElement("textarea", {name: this.getFieldName(), id: this.props.field.id_field, defaultValue: this.props.field.initial}), 
                React.createElement("div", null, this.props.field.help_text), 
                React.createElement(ErrorList, {errors: this.props.errors})
            )
        )
    }
});


},{"../mixins":"/Users/jonas/Projects/Django/django_reform/reform/static/js/src/components/widgets/mixins.js","./base_error_list":"/Users/jonas/Projects/Django/django_reform/reform/static/js/src/components/widgets/templates/base_error_list.js","react":"react"}],"/Users/jonas/Projects/Django/django_reform/reform/static/js/src/components/widgets/templates/time_field.js":[function(require,module,exports){
var React = require('react');
var Input = require('./base_text_input');
var ErrorList = require('./base_error_list');
var InputMixin = require('../mixins').InputMixin;


module.exports = React.createClass({displayName: "exports",
    mixins: [InputMixin],

    render: function () {
        return (
            React.createElement("div", {className: "reform-field"}, 
                React.createElement("label", {htmlFor: this.props.field.id_field}, this.props.field.label), 
                React.createElement(Input, {type: "time", field: this.props.field}), 
                React.createElement("div", null, this.props.field.help_text), 
                React.createElement(ErrorList, {errors: this.props.errors})
            )
        )
    }
});


},{"../mixins":"/Users/jonas/Projects/Django/django_reform/reform/static/js/src/components/widgets/mixins.js","./base_error_list":"/Users/jonas/Projects/Django/django_reform/reform/static/js/src/components/widgets/templates/base_error_list.js","./base_text_input":"/Users/jonas/Projects/Django/django_reform/reform/static/js/src/components/widgets/templates/base_text_input.js","react":"react"}],"/Users/jonas/Projects/Django/django_reform/reform/static/js/src/components/widgets/templates/url_field.js":[function(require,module,exports){
var React = require('react');
var Input = require('./base_text_input');
var ErrorList = require('./base_error_list');


module.exports = React.createClass({displayName: "exports",
    render: function () {
        return (
            React.createElement("div", {className: "reform-field"}, 
                React.createElement("label", {htmlFor: this.props.field.id_field}, this.props.field.label), 
                React.createElement(Input, {type: "url", field: this.props.field}), 
                React.createElement("div", null, this.props.field.help_text), 
                React.createElement(ErrorList, {errors: this.props.errors})
            )
        )
    }
});


},{"./base_error_list":"/Users/jonas/Projects/Django/django_reform/reform/static/js/src/components/widgets/templates/base_error_list.js","./base_text_input":"/Users/jonas/Projects/Django/django_reform/reform/static/js/src/components/widgets/templates/base_text_input.js","react":"react"}],"/Users/jonas/Projects/Django/django_reform/reform/static/js/src/form-manager.js":[function(require,module,exports){
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


},{}],"/Users/jonas/Projects/Django/django_reform/reform/static/js/src/reform.js":[function(require,module,exports){
module.exports = {
    ReForm: require('./components/form'),
    TemplateManager: require('./template-manager'),
    ErrorList: require('./components/widgets/templates/base_error_list'),
    FormManager: require('./form-manager'),
    fields: require('./components/field')
};


},{"./components/field":"/Users/jonas/Projects/Django/django_reform/reform/static/js/src/components/field.js","./components/form":"/Users/jonas/Projects/Django/django_reform/reform/static/js/src/components/form.js","./components/widgets/templates/base_error_list":"/Users/jonas/Projects/Django/django_reform/reform/static/js/src/components/widgets/templates/base_error_list.js","./form-manager":"/Users/jonas/Projects/Django/django_reform/reform/static/js/src/form-manager.js","./template-manager":"/Users/jonas/Projects/Django/django_reform/reform/static/js/src/template-manager.js"}],"/Users/jonas/Projects/Django/django_reform/reform/static/js/src/template-manager.js":[function(require,module,exports){
"use strict";

var React = require('react');
var forms = {};
var fields = {};
var templates = {};
var templateManager = templateManager || { };


var DefaultFormTemplate = React.createClass({displayName: "DefaultFormTemplate",
    render: function () {
        var _this = this;

        return (
            React.createElement("div", null, 
                this.props.fields.map(function (f, i) {
                    var Template = templateManager.getFieldTemplate(f.field.field_type, f.templatePrefix);
                    return React.createElement(Template, {key: f.key, field: f.field, errors: _this.props.errors[f.field.name]})
                }), 
                this.props.children
            )
        )
    }
});


templateManager.registerFormTemplate = function (name, template) {
    forms[name] = template;
};


templateManager.getFormTemplate = function (name) {
    var template = forms[name];
    if (template === undefined) {
        return DefaultFormTemplate
    }
    return template
};


templateManager.registerFieldTemplate = function (fieldType, template, prefix) {
    var name = fieldType;
    if (prefix) {
        name = prefix + "-" + name;
    }
    fields[name] = template;
};


templateManager.getFieldTemplate = function(fieldType, prefix) {
    var name = fieldType;
    if (prefix) {
        name = prefix + "-" + name;
    }
    return fields[name];
};


templateManager.registerTemplate = function (name, template) {
    templates[name] = template;
};


templateManager.getTemplate = function (name) {
    return templates[name];
};


module.exports = templateManager;


},{"react":"react"}],"/Users/jonas/Projects/Django/django_reform/reform/static/js/src/validation.js":[function(require,module,exports){
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


},{}]},{},["/Users/jonas/Projects/Django/django_reform/reform/static/js/index.js"])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3Vzci9sb2NhbC9saWIvbm9kZV9tb2R1bGVzL3dhdGNoaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvam9uYXMvUHJvamVjdHMvRGphbmdvL2RqYW5nb19yZWZvcm0vcmVmb3JtL3N0YXRpYy9qcy9pbmRleC5qcyIsIi9Vc2Vycy9qb25hcy9Qcm9qZWN0cy9EamFuZ28vZGphbmdvX3JlZm9ybS9yZWZvcm0vc3RhdGljL2pzL3NyYy9jb21wb25lbnRzL2ZpZWxkLmpzIiwiL1VzZXJzL2pvbmFzL1Byb2plY3RzL0RqYW5nby9kamFuZ29fcmVmb3JtL3JlZm9ybS9zdGF0aWMvanMvc3JjL2NvbXBvbmVudHMvZm9ybS5qcyIsIi9Vc2Vycy9qb25hcy9Qcm9qZWN0cy9EamFuZ28vZGphbmdvX3JlZm9ybS9yZWZvcm0vc3RhdGljL2pzL3NyYy9jb21wb25lbnRzL3dpZGdldHMvbWl4aW5zLmpzIiwiL1VzZXJzL2pvbmFzL1Byb2plY3RzL0RqYW5nby9kamFuZ29fcmVmb3JtL3JlZm9ybS9zdGF0aWMvanMvc3JjL2NvbXBvbmVudHMvd2lkZ2V0cy90ZW1wbGF0ZXMvYmFzZV9lcnJvcl9saXN0LmpzIiwiL1VzZXJzL2pvbmFzL1Byb2plY3RzL0RqYW5nby9kamFuZ29fcmVmb3JtL3JlZm9ybS9zdGF0aWMvanMvc3JjL2NvbXBvbmVudHMvd2lkZ2V0cy90ZW1wbGF0ZXMvYmFzZV90ZXh0X2lucHV0LmpzIiwiL1VzZXJzL2pvbmFzL1Byb2plY3RzL0RqYW5nby9kamFuZ29fcmVmb3JtL3JlZm9ybS9zdGF0aWMvanMvc3JjL2NvbXBvbmVudHMvd2lkZ2V0cy90ZW1wbGF0ZXMvYm9vbGVhbl9maWVsZC5qcyIsIi9Vc2Vycy9qb25hcy9Qcm9qZWN0cy9EamFuZ28vZGphbmdvX3JlZm9ybS9yZWZvcm0vc3RhdGljL2pzL3NyYy9jb21wb25lbnRzL3dpZGdldHMvdGVtcGxhdGVzL2J1dHRvbi5qcyIsIi9Vc2Vycy9qb25hcy9Qcm9qZWN0cy9EamFuZ28vZGphbmdvX3JlZm9ybS9yZWZvcm0vc3RhdGljL2pzL3NyYy9jb21wb25lbnRzL3dpZGdldHMvdGVtcGxhdGVzL2NoYXJfZmllbGQuanMiLCIvVXNlcnMvam9uYXMvUHJvamVjdHMvRGphbmdvL2RqYW5nb19yZWZvcm0vcmVmb3JtL3N0YXRpYy9qcy9zcmMvY29tcG9uZW50cy93aWRnZXRzL3RlbXBsYXRlcy9kYXRlX2ZpZWxkLmpzIiwiL1VzZXJzL2pvbmFzL1Byb2plY3RzL0RqYW5nby9kamFuZ29fcmVmb3JtL3JlZm9ybS9zdGF0aWMvanMvc3JjL2NvbXBvbmVudHMvd2lkZ2V0cy90ZW1wbGF0ZXMvZGF0ZXRpbWVfZmllbGQuanMiLCIvVXNlcnMvam9uYXMvUHJvamVjdHMvRGphbmdvL2RqYW5nb19yZWZvcm0vcmVmb3JtL3N0YXRpYy9qcy9zcmMvY29tcG9uZW50cy93aWRnZXRzL3RlbXBsYXRlcy9kZWNpbWFsX2ZpZWxkLmpzIiwiL1VzZXJzL2pvbmFzL1Byb2plY3RzL0RqYW5nby9kamFuZ29fcmVmb3JtL3JlZm9ybS9zdGF0aWMvanMvc3JjL2NvbXBvbmVudHMvd2lkZ2V0cy90ZW1wbGF0ZXMvZW1haWxfZmllbGQuanMiLCIvVXNlcnMvam9uYXMvUHJvamVjdHMvRGphbmdvL2RqYW5nb19yZWZvcm0vcmVmb3JtL3N0YXRpYy9qcy9zcmMvY29tcG9uZW50cy93aWRnZXRzL3RlbXBsYXRlcy9pbnRlZ2VyX2ZpZWxkLmpzIiwiL1VzZXJzL2pvbmFzL1Byb2plY3RzL0RqYW5nby9kamFuZ29fcmVmb3JtL3JlZm9ybS9zdGF0aWMvanMvc3JjL2NvbXBvbmVudHMvd2lkZ2V0cy90ZW1wbGF0ZXMvcmFkaW9fc2VsZWN0X2ZpZWxkLmpzIiwiL1VzZXJzL2pvbmFzL1Byb2plY3RzL0RqYW5nby9kamFuZ29fcmVmb3JtL3JlZm9ybS9zdGF0aWMvanMvc3JjL2NvbXBvbmVudHMvd2lkZ2V0cy90ZW1wbGF0ZXMvc2VsZWN0X2ZpZWxkLmpzIiwiL1VzZXJzL2pvbmFzL1Byb2plY3RzL0RqYW5nby9kamFuZ29fcmVmb3JtL3JlZm9ybS9zdGF0aWMvanMvc3JjL2NvbXBvbmVudHMvd2lkZ2V0cy90ZW1wbGF0ZXMvdGV4dF9maWVsZC5qcyIsIi9Vc2Vycy9qb25hcy9Qcm9qZWN0cy9EamFuZ28vZGphbmdvX3JlZm9ybS9yZWZvcm0vc3RhdGljL2pzL3NyYy9jb21wb25lbnRzL3dpZGdldHMvdGVtcGxhdGVzL3RpbWVfZmllbGQuanMiLCIvVXNlcnMvam9uYXMvUHJvamVjdHMvRGphbmdvL2RqYW5nb19yZWZvcm0vcmVmb3JtL3N0YXRpYy9qcy9zcmMvY29tcG9uZW50cy93aWRnZXRzL3RlbXBsYXRlcy91cmxfZmllbGQuanMiLCIvVXNlcnMvam9uYXMvUHJvamVjdHMvRGphbmdvL2RqYW5nb19yZWZvcm0vcmVmb3JtL3N0YXRpYy9qcy9zcmMvZm9ybS1tYW5hZ2VyLmpzIiwiL1VzZXJzL2pvbmFzL1Byb2plY3RzL0RqYW5nby9kamFuZ29fcmVmb3JtL3JlZm9ybS9zdGF0aWMvanMvc3JjL3JlZm9ybS5qcyIsIi9Vc2Vycy9qb25hcy9Qcm9qZWN0cy9EamFuZ28vZGphbmdvX3JlZm9ybS9yZWZvcm0vc3RhdGljL2pzL3NyYy90ZW1wbGF0ZS1tYW5hZ2VyLmpzIiwiL1VzZXJzL2pvbmFzL1Byb2plY3RzL0RqYW5nby9kamFuZ29fcmVmb3JtL3JlZm9ybS9zdGF0aWMvanMvc3JjL3ZhbGlkYXRpb24uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQSxNQUFNLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQzs7OztBQ0F6QyxJQUFJLEtBQUssR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7QUFDN0IsSUFBSSxlQUFlLEdBQUcsT0FBTyxDQUFDLHdCQUF3QixDQUFDLENBQUM7QUFDeEQ7O0FBRUEsK0JBQStCO0FBQy9CLElBQUksS0FBSyxHQUFHLE9BQU8sQ0FBQyx3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UCxJQUFJLEtBQUssQ0FBQyxjQUFjLElBQUksY0FBYyxDQUFDLElBQUksSUFBSSxLQUFLLENBQUMsY0FBYyxFQUFFO2dCQUNyRSxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7YUFDakUsTUFBTTtnQkFDSCxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQzdCO1NBQ0o7QUFDVCxLQUFLOztJQUVELE9BQU8sYUFBYSxDQUFDO0FBQ3pCLENBQUM7QUFDRDs7QUFFQSxNQUFNLENBQUMsT0FBTyxHQUFHO0lBQ2IsUUFBUSxFQUFFLFFBQVE7Q0FDckIsQ0FBQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vc3JjL3JlZm9ybScpO1xuIiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcbnZhciB0ZW1wbGF0ZU1hbmFnZXIgPSByZXF1aXJlKCcuLi90ZW1wbGF0ZS1tYW5hZ2VyLmpzJyk7XG5cblxuLy8gTG9hZCBkZWZhdWx0IGZpZWxkIHRlbXBsYXRlc1xudmFyIElucHV0ID0gcmVxdWlyZSgnLi93aWRnZXRzL3RlbXBsYXRlcy9iYXNlX3RleHRfaW5wdXQuanMnKTtcbnZhciBDaGFyRmllbGQgPSByZXF1aXJlKCcuL3dpZGdldHMvdGVtcGxhdGVzL2NoYXJfZmllbGQuanMnKTtcbnZhciBUZXh0RmllbGQgPSByZXF1aXJlKCcuL3dpZGdldHMvdGVtcGxhdGVzL3RleHRfZmllbGQuanMnKTtcbnZhciBFbWFpbEZpZWxkID0gcmVxdWlyZSgnLi93aWRnZXRzL3RlbXBsYXRlcy9lbWFpbF9maWVsZC5qcycpO1xudmFyIFVSTEZpZWxkID0gcmVxdWlyZSgnLi93aWRnZXRzL3RlbXBsYXRlcy91cmxfZmllbGQuanMnKTtcbnZhciBCb29sZWFuRmllbGQgPSByZXF1aXJlKCcuL3dpZGdldHMvdGVtcGxhdGVzL2Jvb2xlYW5fZmllbGQuanMnKTtcbnZhciBJbnRlZ2VyRmllbGQgPSByZXF1aXJlKCcuL3dpZGdldHMvdGVtcGxhdGVzL2ludGVnZXJfZmllbGQuanMnKTtcbnZhciBEZWNpbWFsRmllbGQgPSByZXF1aXJlKCcuL3dpZGdldHMvdGVtcGxhdGVzL2RlY2ltYWxfZmllbGQuanMnKTtcbnZhciBEYXRlVGltZUZpZWxkID0gcmVxdWlyZSgnLi93aWRnZXRzL3RlbXBsYXRlcy9kYXRldGltZV9maWVsZC5qcycpO1xudmFyIERhdGVGaWVsZCA9IHJlcXVpcmUoJy4vd2lkZ2V0cy90ZW1wbGF0ZXMvZGF0ZV9maWVsZC5qcycpO1xudmFyIFRpbWVGaWVsZCA9IHJlcXVpcmUoJy4vd2lkZ2V0cy90ZW1wbGF0ZXMvdGltZV9maWVsZC5qcycpO1xudmFyIFNlbGVjdEZpZWxkID0gcmVxdWlyZSgnLi93aWRnZXRzL3RlbXBsYXRlcy9zZWxlY3RfZmllbGQuanMnKTtcbnZhciBSYWRpb1NlbGVjdEZpZWxkID0gcmVxdWlyZSgnLi93aWRnZXRzL3RlbXBsYXRlcy9yYWRpb19zZWxlY3RfZmllbGQuanMnKTtcbnZhciBCdXR0b24gPSByZXF1aXJlKCcuL3dpZGdldHMvdGVtcGxhdGVzL2J1dHRvbi5qcycpO1xuXG5cbi8vIFJlZ2lzdGVyIGRlZmF1bHQgZmllbGQgdGVtcGxhdGVzXG50ZW1wbGF0ZU1hbmFnZXIucmVnaXN0ZXJGaWVsZFRlbXBsYXRlKCdjaGFyJywgQ2hhckZpZWxkKTtcbnRlbXBsYXRlTWFuYWdlci5yZWdpc3RlckZpZWxkVGVtcGxhdGUoJ3RleHQnLCBUZXh0RmllbGQpO1xudGVtcGxhdGVNYW5hZ2VyLnJlZ2lzdGVyRmllbGRUZW1wbGF0ZSgnZW1haWwnLCBFbWFpbEZpZWxkKTtcbnRlbXBsYXRlTWFuYWdlci5yZWdpc3RlckZpZWxkVGVtcGxhdGUoJ3VybCcsIFVSTEZpZWxkKTtcbnRlbXBsYXRlTWFuYWdlci5yZWdpc3RlckZpZWxkVGVtcGxhdGUoJ2Jvb2xlYW4nLCBCb29sZWFuRmllbGQpO1xudGVtcGxhdGVNYW5hZ2VyLnJlZ2lzdGVyRmllbGRUZW1wbGF0ZSgnaW50ZWdlcicsIEludGVnZXJGaWVsZCk7XG50ZW1wbGF0ZU1hbmFnZXIucmVnaXN0ZXJGaWVsZFRlbXBsYXRlKCdkZWNpbWFsJywgRGVjaW1hbEZpZWxkKTtcbnRlbXBsYXRlTWFuYWdlci5yZWdpc3RlckZpZWxkVGVtcGxhdGUoJ2RhdGVfdGltZScsIERhdGVUaW1lRmllbGQpO1xudGVtcGxhdGVNYW5hZ2VyLnJlZ2lzdGVyRmllbGRUZW1wbGF0ZSgnZGF0ZScsIERhdGVGaWVsZCk7XG50ZW1wbGF0ZU1hbmFnZXIucmVnaXN0ZXJGaWVsZFRlbXBsYXRlKCd0aW1lJywgVGltZUZpZWxkKTtcbnRlbXBsYXRlTWFuYWdlci5yZWdpc3RlckZpZWxkVGVtcGxhdGUoJ3NlbGVjdCcsIFNlbGVjdEZpZWxkKTtcbnRlbXBsYXRlTWFuYWdlci5yZWdpc3RlckZpZWxkVGVtcGxhdGUoJ3JhZGlvX3NlbGVjdCcsIFJhZGlvU2VsZWN0RmllbGQpO1xudGVtcGxhdGVNYW5hZ2VyLnJlZ2lzdGVyRmllbGRUZW1wbGF0ZSgnYnV0dG9uJywgQnV0dG9uKTtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBJbnB1dDogSW5wdXQsXG4gICAgQ2hhckZpZWxkOiBDaGFyRmllbGQsXG4gICAgVGV4dEZpZWxkOiBUZXh0RmllbGQsXG4gICAgRW1haWxGaWVsZDogRW1haWxGaWVsZCxcbiAgICBVUkxGaWVsZDogVVJMRmllbGQsXG4gICAgQm9vbGVhbkZpZWxkOiBCb29sZWFuRmllbGQsXG4gICAgSW50ZWdlckZpZWxkOiBJbnRlZ2VyRmllbGQsXG4gICAgRGVjaW1hbEZpZWxkOiBEZWNpbWFsRmllbGQsXG4gICAgRGF0ZVRpbWVGaWVsZDogRGF0ZVRpbWVGaWVsZCxcbiAgICBEYXRlRmllbGQ6IERhdGVGaWVsZCxcbiAgICBUaW1lRmllbGQ6IFRpbWVGaWVsZCxcbiAgICBTZWxlY3RGaWVsZDogU2VsZWN0RmllbGQsXG4gICAgUmFkaW9TZWxlY3RGaWVsZDogUmFkaW9TZWxlY3RGaWVsZCxcbiAgICBCdXR0b246IEJ1dHRvbixcbiAgICBtaXhpbnM6IHJlcXVpcmUoJy4vd2lkZ2V0cy9taXhpbnMnKVxufTsiLCJyZXF1aXJlKCcuL2ZpZWxkJyk7XG52YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xudmFyIGZvcm1NYW5hZ2VyID0gcmVxdWlyZSgnLi4vZm9ybS1tYW5hZ2VyJyk7XG52YXIgVGVtcGxhdGVNYW5hZ2VyID0gcmVxdWlyZSgnLi4vdGVtcGxhdGUtbWFuYWdlcicpO1xudmFyIHZhbGlkYXRpb24gPSByZXF1aXJlKCcuLi92YWxpZGF0aW9uJyk7XG5cblxudmFyIFJlRm9ybSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGVycm9yczp7fSxcbiAgICAgICAgICAgIGZvcm06IGZvcm1NYW5hZ2VyLmdldEZvcm0odGhpcy5wcm9wcy5mb3JtKSxcbiAgICAgICAgICAgIHRlbXBsYXRlOiBUZW1wbGF0ZU1hbmFnZXIuZ2V0Rm9ybVRlbXBsYXRlKHRoaXMucHJvcHMuZm9ybSksXG4gICAgICAgICAgICBmaWVsZHM6IG51bGxcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBjb21wb25lbnRXaWxsTW91bnQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuZm9ybSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgZmllbGRzID0gW10sXG4gICAgICAgICAgICBfdGhpcyA9IHRoaXMsXG4gICAgICAgICAgICBpbnN0YW5jZSA9IG51bGw7XG5cbiAgICAgICAgaWYgKHRoaXMucHJvcHMuaW5zdGFuY2UpIHtcbiAgICAgICAgICAgIGluc3RhbmNlID0gdGhpcy5wcm9wcy5pbnN0YW5jZVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5zdGF0ZS5mb3JtLmZpZWxkcy5tYXAoZnVuY3Rpb24gKGZpZWxkLCBpKSB7XG4gICAgICAgICAgICBmaWVsZC5pbml0aWFsID0gaW5zdGFuY2UgIT0gbnVsbCA/IGluc3RhbmNlW2ZpZWxkLm5hbWVdIDogZmllbGQuaW5pdGlhbDtcbiAgICAgICAgICAgIGZpZWxkLnByZWZpeCA9IF90aGlzLnN0YXRlLmZvcm0ubmFtZTtcblxuICAgICAgICAgICAgdmFyIGZpZWxkVGVtcGxhdGUgPSBUZW1wbGF0ZU1hbmFnZXIuZ2V0RmllbGRUZW1wbGF0ZShmaWVsZC5maWVsZF90eXBlLCBfdGhpcy5wcm9wcy5maWVsZFByZWZpeCk7XG5cbiAgICAgICAgICAgIGlmIChmaWVsZFRlbXBsYXRlKVxuICAgICAgICAgICAgICAgIGZpZWxkcy5wdXNoKHtcbiAgICAgICAgICAgICAgICAgICAgZmllbGQ6IGZpZWxkLFxuICAgICAgICAgICAgICAgICAgICBrZXk6IFwiZmllbGQtXCIgKyBpLFxuICAgICAgICAgICAgICAgICAgICByZWY6IGZpZWxkLm5hbWUsXG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlUHJlZml4OiBfdGhpcy5wcm9wcy5maWVsZFByZWZpeFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnNldFN0YXRlKHtmaWVsZHM6ZmllbGRzfSk7XG4gICAgfSxcblxuICAgIGdldEZpZWxkTmFtZTogZnVuY3Rpb24obmFtZSkge1xuICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZS5mb3JtLm5hbWUgKyBcIi1cIiArIG5hbWU7XG4gICAgfSxcblxuICAgIGZvcm1EYXRhOiBmdW5jdGlvbiAoZm9ybSkge1xuICAgICAgICBpZiAodGhpcy5zdGF0ZS5mb3JtID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBkYXRhID0ge30sXG4gICAgICAgICAgICBmaWVsZHMgPSB0aGlzLnN0YXRlLmZvcm0uZmllbGRzLFxuICAgICAgICAgICAgaSwgaiwgZmllbGQsIGlucHV0LCB2YWx1ZTtcblxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgZmllbGRzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgICBmaWVsZCA9IGZpZWxkc1tpXTtcbiAgICAgICAgICAgIGlucHV0cyA9IGZvcm0ucXVlcnlTZWxlY3RvckFsbCgnW25hbWU9XCInICsgdGhpcy5nZXRGaWVsZE5hbWUoZmllbGQubmFtZSkgKyAnXCJdJylcbiAgICAgICAgICAgIGlmIChpbnB1dHMubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICAgICAgaW5wdXQgPSBpbnB1dHNbMF1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZm9yIChqID0gMDsgaiA8IGlucHV0cy5sZW5ndGg7IGogKz0gMSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaW5wdXRzW2pdLnR5cGUgPT09IFwicmFkaW9cIiAmJiBpbnB1dHNbal0uY2hlY2tlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaW5wdXQgPSBpbnB1dHNbal07XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpbnB1dCkge1xuICAgICAgICAgICAgICAgIHZhbHVlID0gaW5wdXQudmFsdWU7XG4gICAgICAgICAgICAgICAgaWYgKGlucHV0LnR5cGUgPT09IFwiY2hlY2tib3hcIikge1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZSA9IGlucHV0LmNoZWNrZWQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGRhdGFbZmllbGQubmFtZV0gPSB2YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnByb3BzLmhhc093blByb3BlcnR5KFwiaW5zdGFuY2VcIikgJiYgdGhpcy5wcm9wcy5pbnN0YW5jZSkge1xuICAgICAgICAgICAgdmFyIGlkX2ZpZWxkID0gdGhpcy5zdGF0ZS5mb3JtLmlkX2ZpZWxkO1xuICAgICAgICAgICAgZGF0YVtpZF9maWVsZF0gPSB0aGlzLnByb3BzLmluc3RhbmNlW2lkX2ZpZWxkXTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBkYXRhO1xuICAgIH0sXG5cbiAgICBjbGVhcjogZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmdldERPTU5vZGUoKS5yZXNldCgpO1xuICAgIH0sXG5cbiAgICBlcnJvcjogZnVuY3Rpb24gKGVycm9ycykge1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtlcnJvcnM6IGVycm9yc30pO1xuICAgIH0sXG5cbiAgICB2YWxpZGF0ZTogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgaWYgKHRoaXMuc3RhdGUuZm9ybSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgZmllbGRzID0gdGhpcy5zdGF0ZS5mb3JtLmZpZWxkcyxcbiAgICAgICAgICAgIGVycm9ycyA9IG51bGwsXG4gICAgICAgICAgICBtZXNzYWdlcyxcbiAgICAgICAgICAgIGksIGZpZWxkLCB2YWx1ZTtcblxuICAgICAgICBmb3IgKGkgPSAwOyBpIDwgZmllbGRzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgICAgICBmaWVsZCA9IGZpZWxkc1tpXTtcbiAgICAgICAgICAgIHZhbHVlID0gZGF0YVtmaWVsZC5uYW1lXTtcbiAgICAgICAgICAgIG1lc3NhZ2VzID0gdmFsaWRhdGlvbi52YWxpZGF0ZShmaWVsZCwgdmFsdWUpO1xuICAgICAgICAgICAgaWYgKG1lc3NhZ2VzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICBlcnJvcnMgPSBlcnJvcnMgfHwge307XG4gICAgICAgICAgICAgICAgZXJyb3JzW2ZpZWxkLm5hbWVdID0gbWVzc2FnZXNcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChlcnJvcnMpXG4gICAgICAgICAgICB0aGlzLmVycm9yKGVycm9ycyk7XG4gICAgfSxcblxuICAgIG9uc3VibWl0OiBmdW5jdGlvbiAoZSkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHZhciBmb3JtID0gZS50YXJnZXQ7XG5cbiAgICAgICAgLy8gUmVzZXQgZXJyb3Igc3RhdGVcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7ZXJyb3JzOiB7fX0pO1xuXG4gICAgICAgIC8vIEdldCBmb3JtIGRhdGFcbiAgICAgICAgdmFyIGRhdGEgPSB0aGlzLmZvcm1EYXRhKGZvcm0pO1xuXG4gICAgICAgIC8vIFZhbGlkYXRlIGlucHV0XG4gICAgICAgIHZhciBlcnJvcnMgPSB0aGlzLnZhbGlkYXRlKGRhdGEpO1xuXG4gICAgICAgIC8vIENhbGwgcGFyZW50IG9uU3VibWl0XG4gICAgICAgIC8vIGlmIGl0J3MgYXZhaWxhYmxlXG4gICAgICAgIGlmICgnb25zdWJtaXQnIGluIHRoaXMucHJvcHMpXG4gICAgICAgICAgICB0aGlzLnByb3BzLm9uc3VibWl0KGRhdGEsIHRoaXMuZm9ybVVybHMoKSk7XG4gICAgfSxcblxuICAgIGZvcm1VcmxzOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLnN0YXRlLmZvcm0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGNyZWF0ZTogdGhpcy5zdGF0ZS5mb3JtLmNyZWF0ZV91cmwsXG4gICAgICAgICAgICB1cGRhdGU6IHRoaXMuc3RhdGUuZm9ybS51cGRhdGVfdXJsXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBUZW1wbGF0ZSA9IHRoaXMuc3RhdGUudGVtcGxhdGU7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmZvcm1sZXNzKSB7XG4gICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgIDxUZW1wbGF0ZSByZWY9XCJmb3JtXCIgZXJyb3JzPXt0aGlzLnN0YXRlLmVycm9yc30gZmllbGRzPXt0aGlzLnN0YXRlLmZpZWxkc30+XG4gICAgICAgICAgICAgICAge3RoaXMucHJvcHMuY2hpbGRyZW59XG4gICAgICAgICAgICAgICAgPC9UZW1wbGF0ZT5cbiAgICAgICAgICAgIClcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8Zm9ybSBvblN1Ym1pdD17dGhpcy5vbnN1Ym1pdH0gY2xhc3NOYW1lPXt0aGlzLnByb3BzLmNsYXNzTmFtZX0+XG4gICAgICAgICAgICAgICAgPFRlbXBsYXRlIHJlZj1cImZvcm1cIiBlcnJvcnM9e3RoaXMuc3RhdGUuZXJyb3JzfSBmaWVsZHM9e3RoaXMuc3RhdGUuZmllbGRzfT5cbiAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5jaGlsZHJlbn1cbiAgICAgICAgICAgICAgICA8L1RlbXBsYXRlPlxuICAgICAgICAgICAgPC9mb3JtPlxuICAgICAgICApXG4gICAgfVxufSk7XG5cblxubW9kdWxlLmV4cG9ydHMgPSBSZUZvcm07XG4iLCJ2YXIgSW5wdXRNaXhpbiA9IHtcbiAgICBnZXRGaWVsZE5hbWU6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGZpZWxkTmFtZSA9IHRoaXMucHJvcHMuZmllbGQucHJlZml4ICsgXCItXCIgKyB0aGlzLnByb3BzLmZpZWxkLm5hbWU7XG4gICAgICAgIHJldHVybiBmaWVsZE5hbWU7XG4gICAgfVxufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgSW5wdXRNaXhpbjogSW5wdXRNaXhpblxufTtcbiIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG5cbnZhciBFcnJvckxpc3QgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmVycm9ycyAmJiB0aGlzLnByb3BzLmVycm9ycy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICB2YXIgZXJyb3JzID0gdGhpcy5wcm9wcy5lcnJvcnM7XG4gICAgICAgICAgICBpZiAoIShlcnJvcnMgaW5zdGFuY2VvZiBBcnJheSkpIHtcbiAgICAgICAgICAgICAgICBlcnJvcnMgPSBbZXJyb3JzXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICA8dWw+XG4gICAgICAgICAgICAgICAge2Vycm9ycy5tYXAoZnVuY3Rpb24gKGVycm9yLCBpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiA8bGkga2V5PXtcImVyci1cIiArIGl9PntlcnJvcn08L2xpPlxuICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICApXG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gPHNwYW4vPlxuICAgIH1cbn0pO1xuXG5cbm1vZHVsZS5leHBvcnRzID0gRXJyb3JMaXN0O1xuIiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcbnZhciBJbnB1dE1peGluID0gcmVxdWlyZSgnLi4vbWl4aW5zJykuSW5wdXRNaXhpbjtcblxudmFyIElucHV0ID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgIG1peGluczogW0lucHV0TWl4aW5dLFxuXG4gICAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBwcm9wcyA9IHt9O1xuXG4gICAgICAgIGlmICh0aGlzLnByb3BzLnN0ZXApIHtcbiAgICAgICAgICAgIHByb3BzLnN0ZXAgPSB0aGlzLnByb3BzLnN0ZXA7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMucHJvcHMuZmllbGQucmVxdWlyZWQpIHtcbiAgICAgICAgICAgIHByb3BzLnJlcXVpcmVkID0gXCJyZXF1aXJlZFwiO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMucHJvcHMuY2xhc3NOYW1lKSB7XG4gICAgICAgICAgICBwcm9wcy5jbGFzc05hbWUgPSB0aGlzLnByb3BzLmNsYXNzTmFtZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBmaWVsZE5hbWUgPSB0aGlzLnByb3BzLmZpZWxkLnByZWZpeCArIFwiLVwiICsgdGhpcy5wcm9wcy5maWVsZC5uYW1lO1xuXG4gICAgICAgIHJldHVybiA8aW5wdXRcbiAgICAgICAgICAgIHR5cGU9e3RoaXMucHJvcHMudHlwZX1cbiAgICAgICAgICAgIG5hbWU9e2ZpZWxkTmFtZX1cbiAgICAgICAgICAgIGlkPXt0aGlzLnByb3BzLmZpZWxkLmlkX2ZpZWxkfVxuICAgICAgICAgICAgZGVmYXVsdFZhbHVlPXt0aGlzLnByb3BzLmZpZWxkLmluaXRpYWx9XG4gICAgICAgICAgICB7Li4ucHJvcHN9XG4gICAgICAgIC8+XG4gICAgfVxufSk7XG5cbm1vZHVsZS5leHBvcnRzID0gSW5wdXQiLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xudmFyIElucHV0ID0gcmVxdWlyZSgnLi9iYXNlX3RleHRfaW5wdXQnKTtcbnZhciBFcnJvckxpc3QgPSByZXF1aXJlKCcuL2Jhc2VfZXJyb3JfbGlzdCcpO1xuXG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgIHJlbmRlcjogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWZvcm0tZmllbGRcIj5cbiAgICAgICAgICAgICAgICA8bGFiZWwgaHRtbEZvcj17dGhpcy5wcm9wcy5maWVsZC5pZF9maWVsZH0+e3RoaXMucHJvcHMuZmllbGQubGFiZWx9PC9sYWJlbD5cbiAgICAgICAgICAgICAgICA8SW5wdXQgdHlwZT1cImNoZWNrYm94XCIgZmllbGQ9e3RoaXMucHJvcHMuZmllbGR9IC8+XG4gICAgICAgICAgICAgICAgPGRpdj57dGhpcy5wcm9wcy5maWVsZC5oZWxwX3RleHR9PC9kaXY+XG4gICAgICAgICAgICAgICAgPEVycm9yTGlzdCBlcnJvcnM9e3RoaXMucHJvcHMuZXJyb3JzfSAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIClcbiAgICB9XG59KTtcbiIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG52YXIgSW5wdXQgPSByZXF1aXJlKCcuL2Jhc2VfdGV4dF9pbnB1dCcpO1xudmFyIEVycm9yTGlzdCA9IHJlcXVpcmUoJy4vYmFzZV9lcnJvcl9saXN0Jyk7XG5cblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlZm9ybS1maWVsZFwiPlxuICAgICAgICAgICAgICAgIDxidXR0b24gZGVmYXVsdFZhbHVlPXt0aGlzLnByb3BzLmZpZWxkLmluaXRpYWx9IHR5cGU9XCJzdWJtaXRcIj57dGhpcy5wcm9wcy5maWVsZC5sYWJlbH08L2J1dHRvbj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApXG4gICAgfVxufSk7XG4iLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xudmFyIElucHV0ID0gcmVxdWlyZSgnLi9iYXNlX3RleHRfaW5wdXQnKTtcbnZhciBFcnJvckxpc3QgPSByZXF1aXJlKCcuL2Jhc2VfZXJyb3JfbGlzdCcpO1xuXG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgIHJlbmRlcjogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWZvcm0tZmllbGRcIj5cbiAgICAgICAgICAgICAgICA8bGFiZWwgaHRtbEZvcj17dGhpcy5wcm9wcy5maWVsZC5pZF9maWVsZH0+e3RoaXMucHJvcHMuZmllbGQubGFiZWx9PC9sYWJlbD5cbiAgICAgICAgICAgICAgICA8SW5wdXQgdHlwZT1cInRleHRcIiBmaWVsZD17dGhpcy5wcm9wcy5maWVsZH0gLz5cbiAgICAgICAgICAgICAgICA8ZGl2Pnt0aGlzLnByb3BzLmZpZWxkLmhlbHBfdGV4dH08L2Rpdj5cbiAgICAgICAgICAgICAgICA8RXJyb3JMaXN0IGVycm9ycz17dGhpcy5wcm9wcy5lcnJvcnN9IC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKVxuICAgIH1cbn0pO1xuIiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcbnZhciBJbnB1dCA9IHJlcXVpcmUoJy4vYmFzZV90ZXh0X2lucHV0Jyk7XG52YXIgRXJyb3JMaXN0ID0gcmVxdWlyZSgnLi9iYXNlX2Vycm9yX2xpc3QnKTtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwicmVmb3JtLWZpZWxkXCI+XG4gICAgICAgICAgICAgICAgPGxhYmVsIGh0bWxGb3I9e3RoaXMucHJvcHMuZmllbGQuaWRfZmllbGR9Pnt0aGlzLnByb3BzLmZpZWxkLmxhYmVsfTwvbGFiZWw+XG4gICAgICAgICAgICAgICAgPElucHV0IHR5cGU9XCJkYXRlXCIgZmllbGQ9e3RoaXMucHJvcHMuZmllbGR9IC8+XG4gICAgICAgICAgICAgICAgPGRpdj57dGhpcy5wcm9wcy5maWVsZC5oZWxwX3RleHR9PC9kaXY+XG4gICAgICAgICAgICAgICAgPEVycm9yTGlzdCBlcnJvcnM9e3RoaXMucHJvcHMuZXJyb3JzfSAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIClcbiAgICB9XG59KTtcbiIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG52YXIgSW5wdXQgPSByZXF1aXJlKCcuL2Jhc2VfdGV4dF9pbnB1dCcpO1xudmFyIEVycm9yTGlzdCA9IHJlcXVpcmUoJy4vYmFzZV9lcnJvcl9saXN0Jyk7XG5cblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlZm9ybS1maWVsZFwiPlxuICAgICAgICAgICAgICAgIDxsYWJlbCBodG1sRm9yPXt0aGlzLnByb3BzLmZpZWxkLmlkX2ZpZWxkfT57dGhpcy5wcm9wcy5maWVsZC5sYWJlbH08L2xhYmVsPlxuICAgICAgICAgICAgICAgIDxJbnB1dCB0eXBlPVwiZGF0ZXRpbWUtbG9jYWxcIiBmaWVsZD17dGhpcy5wcm9wcy5maWVsZH0gLz5cbiAgICAgICAgICAgICAgICA8ZGl2Pnt0aGlzLnByb3BzLmZpZWxkLmhlbHBfdGV4dH08L2Rpdj5cbiAgICAgICAgICAgICAgICA8RXJyb3JMaXN0IGVycm9ycz17dGhpcy5wcm9wcy5lcnJvcnN9IC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKVxuICAgIH1cbn0pO1xuIiwidmFyIFJlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcbnZhciBJbnB1dCA9IHJlcXVpcmUoJy4vYmFzZV90ZXh0X2lucHV0Jyk7XG52YXIgRXJyb3JMaXN0ID0gcmVxdWlyZSgnLi9iYXNlX2Vycm9yX2xpc3QnKTtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgICBkZWNpbWFsUGxhY2VzVG9TdGVwczogZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgZGVjaW1hbFBsYWNlcyA9IHRoaXMucHJvcHMuZmllbGQuZGVjaW1hbF9wbGFjZXMsXG4gICAgICAgICAgICBpLCByZXN1bHQsIGRlY0FycmF5ID0gW107XG5cbiAgICAgICAgaWYgKGRlY2ltYWxQbGFjZXMgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBcIjAuMDFcIjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChkZWNpbWFsUGxhY2VzID4gMCkge1xuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGRlY2ltYWxQbGFjZXM7IGkgKz0gMSkge1xuICAgICAgICAgICAgICAgIGRlY0FycmF5LnB1c2goXCIwXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZGVjQXJyYXkuc3BsaWNlKDEsIDAsIFwiLlwiKTtcbiAgICAgICAgfVxuICAgICAgICBkZWNBcnJheS5wdXNoKFwiMVwiKTtcbiAgICAgICAgcmVzdWx0ID0gZGVjQXJyYXkuam9pbihcIlwiKTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9LFxuXG4gICAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBzdGVwID0gdGhpcy5kZWNpbWFsUGxhY2VzVG9TdGVwcygpO1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWZvcm0tZmllbGRcIj5cbiAgICAgICAgICAgICAgICA8bGFiZWwgaHRtbEZvcj17dGhpcy5wcm9wcy5maWVsZC5pZF9maWVsZH0+e3RoaXMucHJvcHMuZmllbGQubGFiZWx9PC9sYWJlbD5cbiAgICAgICAgICAgICAgICA8SW5wdXQgdHlwZT1cIm51bWJlclwiIHN0ZXA9e3N0ZXB9IGZpZWxkPXt0aGlzLnByb3BzLmZpZWxkfSAvPlxuICAgICAgICAgICAgICAgIDxkaXY+e3RoaXMucHJvcHMuZmllbGQuaGVscF90ZXh0fTwvZGl2PlxuICAgICAgICAgICAgICAgIDxFcnJvckxpc3QgZXJyb3JzPXt0aGlzLnByb3BzLmVycm9yc30gLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApXG4gICAgfVxufSk7XG4iLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xudmFyIElucHV0ID0gcmVxdWlyZSgnLi9iYXNlX3RleHRfaW5wdXQnKTtcbnZhciBFcnJvckxpc3QgPSByZXF1aXJlKCcuL2Jhc2VfZXJyb3JfbGlzdCcpO1xuXG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgIHJlbmRlcjogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWZvcm0tZmllbGRcIj5cbiAgICAgICAgICAgICAgICA8bGFiZWwgaHRtbEZvcj17dGhpcy5wcm9wcy5maWVsZC5pZF9maWVsZH0+e3RoaXMucHJvcHMuZmllbGQubGFiZWx9PC9sYWJlbD5cbiAgICAgICAgICAgICAgICA8SW5wdXQgdHlwZT1cImVtYWlsXCIgZmllbGQ9e3RoaXMucHJvcHMuZmllbGR9IC8+XG4gICAgICAgICAgICAgICAgPGRpdj57dGhpcy5wcm9wcy5maWVsZC5oZWxwX3RleHR9PC9kaXY+XG4gICAgICAgICAgICAgICAgPEVycm9yTGlzdCBlcnJvcnM9e3RoaXMucHJvcHMuZXJyb3JzfSAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIClcbiAgICB9XG59KTtcbiIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG52YXIgSW5wdXQgPSByZXF1aXJlKCcuL2Jhc2VfdGV4dF9pbnB1dCcpO1xudmFyIEVycm9yTGlzdCA9IHJlcXVpcmUoJy4vYmFzZV9lcnJvcl9saXN0Jyk7XG5cblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlZm9ybS1maWVsZFwiPlxuICAgICAgICAgICAgICAgIDxsYWJlbCBodG1sRm9yPXt0aGlzLnByb3BzLmZpZWxkLmlkX2ZpZWxkfT57dGhpcy5wcm9wcy5maWVsZC5sYWJlbH08L2xhYmVsPlxuICAgICAgICAgICAgICAgIDxJbnB1dCB0eXBlPVwibnVtYmVyXCIgZmllbGQ9e3RoaXMucHJvcHMuZmllbGR9IC8+XG4gICAgICAgICAgICAgICAgPGRpdj57dGhpcy5wcm9wcy5maWVsZC5oZWxwX3RleHR9PC9kaXY+XG4gICAgICAgICAgICAgICAgPEVycm9yTGlzdCBlcnJvcnM9e3RoaXMucHJvcHMuZXJyb3JzfSAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIClcbiAgICB9XG59KTtcbiIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG52YXIgRXJyb3JMaXN0ID0gcmVxdWlyZSgnLi9iYXNlX2Vycm9yX2xpc3QnKTtcbnZhciBJbnB1dE1peGluID0gcmVxdWlyZSgnLi4vbWl4aW5zJykuSW5wdXRNaXhpbjtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgICBtaXhpbnM6IFtJbnB1dE1peGluXSxcblxuICAgIHJlbmRlcjogZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIga2V5X2ZpZWxkID0gdGhpcy5wcm9wcy5maWVsZC5rZXlfZmllbGQ7XG4gICAgICAgIHZhciBsYWJlbF9maWVsZCA9IHRoaXMucHJvcHMuZmllbGQubGFiZWxfZmllbGQ7XG5cbiAgICAgICAgdmFyIHByb3BzID0ge307XG4gICAgICAgIGlmICh0aGlzLnByb3BzLmZpZWxkLnJlcXVpcmVkKSB7XG4gICAgICAgICAgICBwcm9wcy5yZXF1aXJlZCA9ICdyZXF1aXJlZCdcbiAgICAgICAgfVxuICAgICAgICB2YXIgZmllbGQgPSB0aGlzLnByb3BzLmZpZWxkO1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWZvcm0tZmllbGRcIj5cbiAgICAgICAgICAgICAgICB7ZmllbGQubGFiZWx9XG4gICAgICAgICAgICAgICAge2ZpZWxkLmNob2ljZXMubWFwKGZ1bmN0aW9uIChjaG9pY2UsIGkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCBodG1sRm9yPXtmaWVsZC5pZF9maWVsZCArIFwiX1wiICsgaX0ga2V5PXtcImxhYmVsLVwiICsgaX0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJyYWRpb1wiIG5hbWU9e3RoaXMuZ2V0RmllbGROYW1lKCl9IGlkPXtmaWVsZC5pZF9maWVsZCArIFwiX1wiICsgaX0ga2V5PXtcIm9wdC1cIiArIGl9IHZhbHVlPXtjaG9pY2Vba2V5X2ZpZWxkXX0gey4uLnByb3BzfSAvPntjaG9pY2VbbGFiZWxfZmllbGRdfVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgIDxkaXY+e3RoaXMucHJvcHMuZmllbGQuaGVscF90ZXh0fTwvZGl2PlxuICAgICAgICAgICAgICAgIDxFcnJvckxpc3QgZXJyb3JzPXt0aGlzLnByb3BzLmVycm9yc30gLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApXG4gICAgfVxufSk7XG4iLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xudmFyIEVycm9yTGlzdCA9IHJlcXVpcmUoJy4vYmFzZV9lcnJvcl9saXN0Jyk7XG52YXIgSW5wdXRNaXhpbiA9IHJlcXVpcmUoJy4uL21peGlucycpLklucHV0TWl4aW47XG5cblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gICAgbWl4aW5zOiBbSW5wdXRNaXhpbl0sXG5cbiAgICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIGtleV9maWVsZCA9IHRoaXMucHJvcHMuZmllbGQua2V5X2ZpZWxkO1xuICAgICAgICB2YXIgbGFiZWxfZmllbGQgPSB0aGlzLnByb3BzLmZpZWxkLmxhYmVsX2ZpZWxkO1xuXG4gICAgICAgIHZhciBwcm9wcyA9IHt9O1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5maWVsZC5yZXF1aXJlZCkge1xuICAgICAgICAgICAgcHJvcHMucmVxdWlyZWQgPSAncmVxdWlyZWQnXG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5wcm9wcy5vbkNoYW5nZSkge1xuICAgICAgICAgICAgcHJvcHMub25DaGFuZ2UgPSB0aGlzLnByb3BzLm9uQ2hhbmdlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMucHJvcHMubXVsdGkpIHtcbiAgICAgICAgICAgIHByb3BzLm11bHRpcGxlID0gJ211bHRpcGxlJztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlZm9ybS1maWVsZFwiPlxuICAgICAgICAgICAgICAgIDxsYWJlbCBodG1sRm9yPXt0aGlzLnByb3BzLmZpZWxkLmlkX2ZpZWxkfT57dGhpcy5wcm9wcy5maWVsZC5sYWJlbH08L2xhYmVsPlxuICAgICAgICAgICAgICAgIDxzZWxlY3QgbmFtZT17dGhpcy5nZXRGaWVsZE5hbWUoKX0gaWQ9e3RoaXMucHJvcHMuZmllbGQuaWRfZmllbGR9IGRlZmF1bHRWYWx1ZT17dGhpcy5wcm9wcy5maWVsZC5pbml0aWFsfSB7Li4ucHJvcHN9PlxuICAgICAgICAgICAgICAgIHt0aGlzLnByb3BzLmZpZWxkLmNob2ljZXMubWFwKGZ1bmN0aW9uIChjaG9pY2UsIGkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDxvcHRpb24ga2V5PXtcIm9wdC1cIiArIGl9IHZhbHVlPXtjaG9pY2Vba2V5X2ZpZWxkXX0+e2Nob2ljZVtsYWJlbF9maWVsZF19PC9vcHRpb24+XG4gICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgPC9zZWxlY3Q+XG4gICAgICAgICAgICAgICAgPGRpdj57dGhpcy5wcm9wcy5maWVsZC5oZWxwX3RleHR9PC9kaXY+XG4gICAgICAgICAgICAgICAgPEVycm9yTGlzdCBlcnJvcnM9e3RoaXMucHJvcHMuZXJyb3JzfSAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIClcbiAgICB9XG59KTtcbiIsInZhciBSZWFjdCA9IHJlcXVpcmUoJ3JlYWN0Jyk7XG52YXIgRXJyb3JMaXN0ID0gcmVxdWlyZSgnLi9iYXNlX2Vycm9yX2xpc3QnKTtcbnZhciBJbnB1dE1peGluID0gcmVxdWlyZSgnLi4vbWl4aW5zJykuSW5wdXRNaXhpbjtcblxuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgICBtaXhpbnM6IFtJbnB1dE1peGluXSxcblxuICAgIHJlbmRlcjogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWZvcm0tZmllbGRcIj5cbiAgICAgICAgICAgICAgICA8bGFiZWwgaHRtbEZvcj17dGhpcy5wcm9wcy5maWVsZC5pZF9maWVsZH0+e3RoaXMucHJvcHMuZmllbGQubGFiZWx9PC9sYWJlbD5cbiAgICAgICAgICAgICAgICA8dGV4dGFyZWEgbmFtZT17dGhpcy5nZXRGaWVsZE5hbWUoKX0gaWQ9e3RoaXMucHJvcHMuZmllbGQuaWRfZmllbGR9IGRlZmF1bHRWYWx1ZT17dGhpcy5wcm9wcy5maWVsZC5pbml0aWFsfT48L3RleHRhcmVhPlxuICAgICAgICAgICAgICAgIDxkaXY+e3RoaXMucHJvcHMuZmllbGQuaGVscF90ZXh0fTwvZGl2PlxuICAgICAgICAgICAgICAgIDxFcnJvckxpc3QgZXJyb3JzPXt0aGlzLnByb3BzLmVycm9yc30gLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApXG4gICAgfVxufSk7XG4iLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xudmFyIElucHV0ID0gcmVxdWlyZSgnLi9iYXNlX3RleHRfaW5wdXQnKTtcbnZhciBFcnJvckxpc3QgPSByZXF1aXJlKCcuL2Jhc2VfZXJyb3JfbGlzdCcpO1xudmFyIElucHV0TWl4aW4gPSByZXF1aXJlKCcuLi9taXhpbnMnKS5JbnB1dE1peGluO1xuXG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgIG1peGluczogW0lucHV0TWl4aW5dLFxuXG4gICAgcmVuZGVyOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInJlZm9ybS1maWVsZFwiPlxuICAgICAgICAgICAgICAgIDxsYWJlbCBodG1sRm9yPXt0aGlzLnByb3BzLmZpZWxkLmlkX2ZpZWxkfT57dGhpcy5wcm9wcy5maWVsZC5sYWJlbH08L2xhYmVsPlxuICAgICAgICAgICAgICAgIDxJbnB1dCB0eXBlPVwidGltZVwiIGZpZWxkPXt0aGlzLnByb3BzLmZpZWxkfSAvPlxuICAgICAgICAgICAgICAgIDxkaXY+e3RoaXMucHJvcHMuZmllbGQuaGVscF90ZXh0fTwvZGl2PlxuICAgICAgICAgICAgICAgIDxFcnJvckxpc3QgZXJyb3JzPXt0aGlzLnByb3BzLmVycm9yc30gLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApXG4gICAgfVxufSk7XG4iLCJ2YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xudmFyIElucHV0ID0gcmVxdWlyZSgnLi9iYXNlX3RleHRfaW5wdXQnKTtcbnZhciBFcnJvckxpc3QgPSByZXF1aXJlKCcuL2Jhc2VfZXJyb3JfbGlzdCcpO1xuXG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICAgIHJlbmRlcjogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJyZWZvcm0tZmllbGRcIj5cbiAgICAgICAgICAgICAgICA8bGFiZWwgaHRtbEZvcj17dGhpcy5wcm9wcy5maWVsZC5pZF9maWVsZH0+e3RoaXMucHJvcHMuZmllbGQubGFiZWx9PC9sYWJlbD5cbiAgICAgICAgICAgICAgICA8SW5wdXQgdHlwZT1cInVybFwiIGZpZWxkPXt0aGlzLnByb3BzLmZpZWxkfSAvPlxuICAgICAgICAgICAgICAgIDxkaXY+e3RoaXMucHJvcHMuZmllbGQuaGVscF90ZXh0fTwvZGl2PlxuICAgICAgICAgICAgICAgIDxFcnJvckxpc3QgZXJyb3JzPXt0aGlzLnByb3BzLmVycm9yc30gLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICApXG4gICAgfVxufSk7XG4iLCJ2YXIgZm9ybU1hbmFnZXIgPSBmb3JtTWFuYWdlciB8fCB7fTtcblxudmFyIGZvcm1zID0ge307XG5cbmZvcm1NYW5hZ2VyLmRpZ2VzdEZvcm1zID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGtleSwgZm9ybSwgZm9ybVNlbGVjdG9yQ2xhc3MsIHRhcmdldHM7XG5cbiAgICBmb3IgKGtleSBpbiB3aW5kb3cucmVmb3Jtcykge1xuICAgICAgICBmb3JtID0gd2luZG93LnJlZm9ybXNba2V5XTtcbiAgICAgICAgZm9ybXNba2V5XSA9IGZvcm07XG4gICAgfVxufTtcblxuZm9ybU1hbmFnZXIuZ2V0Rm9ybSA9IGZ1bmN0aW9uIChuYW1lLCBvcHRzKSB7XG4gICAgdmFyIGZvcm0gPSBmb3Jtc1tuYW1lXTtcbiAgICBvcHRzID0gb3B0cyB8fCB7fTtcbiAgICB2YXIgZm9ybUtleSA9IG9wdHMua2V5IHx8IFwiZm9ybS1cIiArIERhdGUubm93KCk7XG4gICAgdmFyIGluaXRpYWwgPSBvcHRzLmluaXRpYWw7XG4gICAgdmFyIGNyZWF0ZSA9IG9wdHMuY3JlYXRlO1xuICAgIHZhciB1cGRhdGUgPSBvcHRzLnVwZGF0ZTtcbiAgICB2YXIgcGFyZW50ID0gb3B0cy5wYXJlbnQ7XG4gICAgcmV0dXJuIGZvcm07XG59O1xuXG5mb3JtTWFuYWdlci5kaWdlc3RGb3JtcygpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBnZXRGb3JtOiBmb3JtTWFuYWdlci5nZXRGb3JtXG59O1xuIiwibW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgUmVGb3JtOiByZXF1aXJlKCcuL2NvbXBvbmVudHMvZm9ybScpLFxuICAgIFRlbXBsYXRlTWFuYWdlcjogcmVxdWlyZSgnLi90ZW1wbGF0ZS1tYW5hZ2VyJyksXG4gICAgRXJyb3JMaXN0OiByZXF1aXJlKCcuL2NvbXBvbmVudHMvd2lkZ2V0cy90ZW1wbGF0ZXMvYmFzZV9lcnJvcl9saXN0JyksXG4gICAgRm9ybU1hbmFnZXI6IHJlcXVpcmUoJy4vZm9ybS1tYW5hZ2VyJyksXG4gICAgZmllbGRzOiByZXF1aXJlKCcuL2NvbXBvbmVudHMvZmllbGQnKVxufTtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgUmVhY3QgPSByZXF1aXJlKCdyZWFjdCcpO1xudmFyIGZvcm1zID0ge307XG52YXIgZmllbGRzID0ge307XG52YXIgdGVtcGxhdGVzID0ge307XG52YXIgdGVtcGxhdGVNYW5hZ2VyID0gdGVtcGxhdGVNYW5hZ2VyIHx8IHsgfTtcblxuXG52YXIgRGVmYXVsdEZvcm1UZW1wbGF0ZSA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgICByZW5kZXI6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICB7dGhpcy5wcm9wcy5maWVsZHMubWFwKGZ1bmN0aW9uIChmLCBpKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciBUZW1wbGF0ZSA9IHRlbXBsYXRlTWFuYWdlci5nZXRGaWVsZFRlbXBsYXRlKGYuZmllbGQuZmllbGRfdHlwZSwgZi50ZW1wbGF0ZVByZWZpeCk7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiA8VGVtcGxhdGUga2V5PXtmLmtleX0gZmllbGQ9e2YuZmllbGR9IGVycm9ycz17X3RoaXMucHJvcHMuZXJyb3JzW2YuZmllbGQubmFtZV19IC8+XG4gICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAge3RoaXMucHJvcHMuY2hpbGRyZW59XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKVxuICAgIH1cbn0pO1xuXG5cbnRlbXBsYXRlTWFuYWdlci5yZWdpc3RlckZvcm1UZW1wbGF0ZSA9IGZ1bmN0aW9uIChuYW1lLCB0ZW1wbGF0ZSkge1xuICAgIGZvcm1zW25hbWVdID0gdGVtcGxhdGU7XG59O1xuXG5cbnRlbXBsYXRlTWFuYWdlci5nZXRGb3JtVGVtcGxhdGUgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHZhciB0ZW1wbGF0ZSA9IGZvcm1zW25hbWVdO1xuICAgIGlmICh0ZW1wbGF0ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiBEZWZhdWx0Rm9ybVRlbXBsYXRlXG4gICAgfVxuICAgIHJldHVybiB0ZW1wbGF0ZVxufTtcblxuXG50ZW1wbGF0ZU1hbmFnZXIucmVnaXN0ZXJGaWVsZFRlbXBsYXRlID0gZnVuY3Rpb24gKGZpZWxkVHlwZSwgdGVtcGxhdGUsIHByZWZpeCkge1xuICAgIHZhciBuYW1lID0gZmllbGRUeXBlO1xuICAgIGlmIChwcmVmaXgpIHtcbiAgICAgICAgbmFtZSA9IHByZWZpeCArIFwiLVwiICsgbmFtZTtcbiAgICB9XG4gICAgZmllbGRzW25hbWVdID0gdGVtcGxhdGU7XG59O1xuXG5cbnRlbXBsYXRlTWFuYWdlci5nZXRGaWVsZFRlbXBsYXRlID0gZnVuY3Rpb24oZmllbGRUeXBlLCBwcmVmaXgpIHtcbiAgICB2YXIgbmFtZSA9IGZpZWxkVHlwZTtcbiAgICBpZiAocHJlZml4KSB7XG4gICAgICAgIG5hbWUgPSBwcmVmaXggKyBcIi1cIiArIG5hbWU7XG4gICAgfVxuICAgIHJldHVybiBmaWVsZHNbbmFtZV07XG59O1xuXG5cbnRlbXBsYXRlTWFuYWdlci5yZWdpc3RlclRlbXBsYXRlID0gZnVuY3Rpb24gKG5hbWUsIHRlbXBsYXRlKSB7XG4gICAgdGVtcGxhdGVzW25hbWVdID0gdGVtcGxhdGU7XG59O1xuXG5cbnRlbXBsYXRlTWFuYWdlci5nZXRUZW1wbGF0ZSA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgcmV0dXJuIHRlbXBsYXRlc1tuYW1lXTtcbn07XG5cblxubW9kdWxlLmV4cG9ydHMgPSB0ZW1wbGF0ZU1hbmFnZXI7XG4iLCJmdW5jdGlvbiB2YWxpZGF0ZU1heExlbmd0aCAodmFsdWUsIGFyZ3MpIHtcbiAgICBpZiAodmFsdWUubGVuZ3RoID4gYXJncy5tYXhfbGVuZ3RoKVxuICAgICAgICByZXR1cm4gXCJDYW4ndCBiZSBsb25nZXIgdGhhbiBcIiArIGFyZ3MubWF4X2xlbmd0aCArIFwiIGNoYXJhY3RlcnNcIjtcbiAgICByZXR1cm4gbnVsbDtcbn1cblxuXG5mdW5jdGlvbiB2YWxpZGF0ZUVtYWlsKHZhbHVlLCBhcmdzKSB7XG4gICAgdmFyIHJlID0gL14oKFtePD4oKVtcXF1cXFxcLiw7Olxcc0BcXFwiXSsoXFwuW148PigpW1xcXVxcXFwuLDs6XFxzQFxcXCJdKykqKXwoXFxcIi4rXFxcIikpQCgoXFxbWzAtOV17MSwzfVxcLlswLTldezEsM31cXC5bMC05XXsxLDN9XFwuWzAtOV17MSwzfVxcXSl8KChbYS16QS1aXFwtMC05XStcXC4pK1thLXpBLVpdezIsfSkpJC87XG4gICAgaWYgKCFyZS50ZXN0KHZhbHVlKSlcbiAgICAgICAgcmV0dXJuIFwiSW52YWxpZCBlbWFpbFwiO1xuICAgIHJldHVybiBudWxsO1xufVxuXG5cbmZ1bmN0aW9uIHZhbGlkYXRlVXJsKHZhbHVlLCBhcmdzKSB7XG4gICAgdmFyIHJlID0gL14oaHR0cHM/fGZ0cCk6XFwvXFwvKCgoKFthLXpdfFxcZHwtfFxcLnxffH58W1xcdTAwQTAtXFx1RDdGRlxcdUY5MDAtXFx1RkRDRlxcdUZERjAtXFx1RkZFRl0pfCglW1xcZGEtZl17Mn0pfFshXFwkJidcXChcXClcXCpcXCssOz1dfDopKkApPygoKFxcZHxbMS05XVxcZHwxXFxkXFxkfDJbMC00XVxcZHwyNVswLTVdKVxcLihcXGR8WzEtOV1cXGR8MVxcZFxcZHwyWzAtNF1cXGR8MjVbMC01XSlcXC4oXFxkfFsxLTldXFxkfDFcXGRcXGR8MlswLTRdXFxkfDI1WzAtNV0pXFwuKFxcZHxbMS05XVxcZHwxXFxkXFxkfDJbMC00XVxcZHwyNVswLTVdKSl8KCgoW2Etel18XFxkfFtcXHUwMEEwLVxcdUQ3RkZcXHVGOTAwLVxcdUZEQ0ZcXHVGREYwLVxcdUZGRUZdKXwoKFthLXpdfFxcZHxbXFx1MDBBMC1cXHVEN0ZGXFx1RjkwMC1cXHVGRENGXFx1RkRGMC1cXHVGRkVGXSkoW2Etel18XFxkfC18XFwufF98fnxbXFx1MDBBMC1cXHVEN0ZGXFx1RjkwMC1cXHVGRENGXFx1RkRGMC1cXHVGRkVGXSkqKFthLXpdfFxcZHxbXFx1MDBBMC1cXHVEN0ZGXFx1RjkwMC1cXHVGRENGXFx1RkRGMC1cXHVGRkVGXSkpKVxcLikrKChbYS16XXxbXFx1MDBBMC1cXHVEN0ZGXFx1RjkwMC1cXHVGRENGXFx1RkRGMC1cXHVGRkVGXSl8KChbYS16XXxbXFx1MDBBMC1cXHVEN0ZGXFx1RjkwMC1cXHVGRENGXFx1RkRGMC1cXHVGRkVGXSkoW2Etel18XFxkfC18XFwufF98fnxbXFx1MDBBMC1cXHVEN0ZGXFx1RjkwMC1cXHVGRENGXFx1RkRGMC1cXHVGRkVGXSkqKFthLXpdfFtcXHUwMEEwLVxcdUQ3RkZcXHVGOTAwLVxcdUZEQ0ZcXHVGREYwLVxcdUZGRUZdKSkpXFwuPykoOlxcZCopPykoXFwvKCgoW2Etel18XFxkfC18XFwufF98fnxbXFx1MDBBMC1cXHVEN0ZGXFx1RjkwMC1cXHVGRENGXFx1RkRGMC1cXHVGRkVGXSl8KCVbXFxkYS1mXXsyfSl8WyFcXCQmJ1xcKFxcKVxcKlxcKyw7PV18OnxAKSsoXFwvKChbYS16XXxcXGR8LXxcXC58X3x+fFtcXHUwMEEwLVxcdUQ3RkZcXHVGOTAwLVxcdUZEQ0ZcXHVGREYwLVxcdUZGRUZdKXwoJVtcXGRhLWZdezJ9KXxbIVxcJCYnXFwoXFwpXFwqXFwrLDs9XXw6fEApKikqKT8pPyhcXD8oKChbYS16XXxcXGR8LXxcXC58X3x+fFtcXHUwMEEwLVxcdUQ3RkZcXHVGOTAwLVxcdUZEQ0ZcXHVGREYwLVxcdUZGRUZdKXwoJVtcXGRhLWZdezJ9KXxbIVxcJCYnXFwoXFwpXFwqXFwrLDs9XXw6fEApfFtcXHVFMDAwLVxcdUY4RkZdfFxcL3xcXD8pKik/KFxcIygoKFthLXpdfFxcZHwtfFxcLnxffH58W1xcdTAwQTAtXFx1RDdGRlxcdUY5MDAtXFx1RkRDRlxcdUZERjAtXFx1RkZFRl0pfCglW1xcZGEtZl17Mn0pfFshXFwkJidcXChcXClcXCpcXCssOz1dfDp8QCl8XFwvfFxcPykqKT8kL2k7XG4gICAgaWYgKCFyZS50ZXN0KHZhbHVlKSlcbiAgICAgICAgcmV0dXJuIFwiSW52YWxpZCB1cmxcIjtcbiAgICByZXR1cm4gbnVsbDtcbn1cblxuXG5mdW5jdGlvbiB2YWxpZGF0ZU1pblZhbHVlICh2YWx1ZSwgYXJncykge1xuICAgIGlmICh2YWx1ZSA8IGFyZ3MubWluX3ZhbHVlKVxuICAgICAgICByZXR1cm4gXCJOZWVkcyB0byBiZSBhdCBsZWFzdCBcIiArIGFyZ3MubWluX3ZhbHVlO1xuICAgIHJldHVybiBudWxsO1xufVxuXG5cbmZ1bmN0aW9uIHZhbGlkYXRlTWF4VmFsdWUgKHZhbHVlLCBhcmdzKSB7XG4gICAgaWYgKHZhbHVlID4gYXJncy5tYXhfdmFsdWUpXG4gICAgICAgIHJldHVybiBcIkNhbid0IGJlIG1vcmUgdGhhbiBcIiArIGFyZ3MubWF4X3ZhbHVlO1xuICAgIHJldHVybiBudWxsO1xufVxuXG5cbnZhciB2YWxpZGF0b3JzID0ge1xuICAgIG1heF9sZW5ndGg6IHZhbGlkYXRlTWF4TGVuZ3RoLFxuICAgIGVtYWlsOiB2YWxpZGF0ZUVtYWlsLFxuICAgIHVybDogdmFsaWRhdGVVcmwsXG4gICAgbWluX3ZhbHVlOiB2YWxpZGF0ZU1pblZhbHVlLFxuICAgIG1heF92YWx1ZTogdmFsaWRhdGVNYXhWYWx1ZVxufTtcblxuXG5mdW5jdGlvbiB2YWxpZGF0ZSAoZmllbGQsIHZhbHVlKSB7XG4gICAgdmFyIGksIHZhbGlkYXRpb25BcmdzLCB2YWxpZGF0b3IsIGVycm9yLCBlcnJvck1lc3NhZ2VzID0gW107XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgZmllbGQudmFsaWRhdG9ycy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICB2YWxpZGF0aW9uQXJncyA9IGZpZWxkLnZhbGlkYXRvcnNbaV07XG4gICAgICAgIHZhbGlkYXRvciA9IHZhbGlkYXRvcnNbdmFsaWRhdGlvbkFyZ3MubmFtZV07XG4gICAgICAgIGVycm9yID0gdmFsaWRhdG9yKHZhbHVlLCB2YWxpZGF0aW9uQXJncyk7XG4gICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgaWYgKGZpZWxkLmVycm9yX21lc3NhZ2VzICYmIHZhbGlkYXRpb25BcmdzLm5hbWUgaW4gZmllbGQuZXJyb3JfbWVzc2FnZXMpIHtcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2VzLnB1c2goZmllbGQuZXJyb3JfbWVzc2FnZXNbdmFsaWRhdGlvbkFyZ3MubmFtZV0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2VzLnB1c2goZXJyb3IpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGVycm9yTWVzc2FnZXM7XG59XG5cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgdmFsaWRhdGU6IHZhbGlkYXRlXG59O1xuIl19
