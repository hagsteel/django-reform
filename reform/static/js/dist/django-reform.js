!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.DjangoReform=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = require('./src/reform');


},{"./src/reform":20}],2:[function(require,module,exports){
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


},{"../template-manager.js":21,"./widgets/templates/boolean_field.js":6,"./widgets/templates/button.js":7,"./widgets/templates/char_field.js":8,"./widgets/templates/date_field.js":9,"./widgets/templates/datetime_field.js":10,"./widgets/templates/decimal_field.js":11,"./widgets/templates/email_field.js":12,"./widgets/templates/integer_field.js":13,"./widgets/templates/radio_select_field.js":14,"./widgets/templates/select_field.js":15,"./widgets/templates/text_field.js":16,"./widgets/templates/time_field.js":17,"./widgets/templates/url_field.js":18,"react":"react"}],3:[function(require,module,exports){
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
                this.props.fields.map(function (f, i) {
                    var Template = templateManager.getFieldTemplate(f.field.field_type);
                    return React.createElement(Template, {key: f.key, field: f.field, errors: _this.props.errors[f.field.name]})
                }), 
                this.props.children
            )
        )
    }
});


var ReForm = React.createClass({displayName: "ReForm",
    getInitialState: function () {
        return {
            errors:{},
            form: formManager.getForm(this.props.form),
            template: templateManager.getFormTemplate(this.props.form) || DefaultTemplate,
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
            field.initial = instance != null ? instance[field.name] : null;
            var fieldTemplate = templateManager.getFieldTemplate(field.field_type)
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
        if (this.state.form === undefined) {
            return;
        }

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


},{"../form-manager":19,"../template-manager":21,"../validation":22,"./field":2,"react":"react"}],4:[function(require,module,exports){
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


},{"react":"react"}],5:[function(require,module,exports){
var React = require('react');

var Input = React.createClass({displayName: "Input",
    render: function () {
        var props = {};
        if (this.props.step) {
            props.step = this.props.step;
        }
        if (this.props.field.required) {
            props.required = "required";
        }

        return React.createElement("input", React.__spread({
            type: this.props.type, 
            name: this.props.field.name, 
            id: this.props.field.id_field, 
            defaultValue: this.props.field.initial}, 
            props)
        )
    }
});

module.exports = Input

},{"react":"react"}],6:[function(require,module,exports){
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


},{"./base_error_list":4,"./base_text_input":5,"react":"react"}],7:[function(require,module,exports){
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


},{"./base_error_list":4,"./base_text_input":5,"react":"react"}],8:[function(require,module,exports){
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


},{"./base_error_list":4,"./base_text_input":5,"react":"react"}],9:[function(require,module,exports){
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


},{"./base_error_list":4,"./base_text_input":5,"react":"react"}],10:[function(require,module,exports){
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


},{"./base_error_list":4,"./base_text_input":5,"react":"react"}],11:[function(require,module,exports){
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


},{"./base_error_list":4,"./base_text_input":5,"react":"react"}],12:[function(require,module,exports){
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


},{"./base_error_list":4,"./base_text_input":5,"react":"react"}],13:[function(require,module,exports){
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


},{"./base_error_list":4,"./base_text_input":5,"react":"react"}],14:[function(require,module,exports){
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
            React.createElement("div", {className: "reform-field"}, 
                field.label, 
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


},{"./base_error_list":4,"react":"react"}],15:[function(require,module,exports){
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

        if (this.props.onChange) {
            props.onChange = this.props.onChange;
        }

        return (
            React.createElement("div", {className: "reform-field"}, 
                React.createElement("label", {htmlFor: this.props.field.id_field}, this.props.field.label), 
                React.createElement("select", React.__spread({name: this.props.field.name, id: this.props.field.id_field, defaultValue: this.props.field.initial},  props), 
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


},{"./base_error_list":4,"react":"react"}],16:[function(require,module,exports){
var React = require('react');
var ErrorList = require('./base_error_list');


module.exports = React.createClass({displayName: "exports",
    render: function () {
        return (
            React.createElement("div", {className: "reform-field"}, 
                React.createElement("label", {htmlFor: this.props.field.id_field}, this.props.field.label), 
                React.createElement("textarea", {name: this.props.field.name, id: this.props.field.id_field, defaultValue: this.props.field.initial}), 
                React.createElement("div", null, this.props.field.help_text), 
                React.createElement(ErrorList, {errors: this.props.errors})
            )
        )
    }
});


},{"./base_error_list":4,"react":"react"}],17:[function(require,module,exports){
var React = require('react');
var Input = require('./base_text_input');
var ErrorList = require('./base_error_list');


module.exports = React.createClass({displayName: "exports",
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


},{"./base_error_list":4,"./base_text_input":5,"react":"react"}],18:[function(require,module,exports){
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


},{"./base_error_list":4,"./base_text_input":5,"react":"react"}],19:[function(require,module,exports){
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


},{}],20:[function(require,module,exports){
var ReForm = require('./components/form');
var TemplateManager = require('./template-manager');
var ErrorList = require('./components/widgets/templates/base_error_list');
var FormManager = require('./form-manager');


module.exports = {
    ReForm: ReForm,
    TemplateManager: TemplateManager,
    ErrorList: ErrorList,
    FormManager: FormManager
};


},{"./components/form":3,"./components/widgets/templates/base_error_list":4,"./form-manager":19,"./template-manager":21}],21:[function(require,module,exports){
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


module.exports = templateManager;


},{}],22:[function(require,module,exports){
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


},{}]},{},[1])(1)
});