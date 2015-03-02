require('./field');
var React = require('react');
var formManager = require('../form-manager');
var templateManager = require('../template-manager');
var validation = require('../validation');


var ReForm = React.createClass({
    getInitialState: function () {
        return {
            errors:{},
            form: formManager.getForm(this.props.form),
            template: templateManager.getFormTemplate(this.props.form),
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
            <form onSubmit={this.onsubmit} className={this.props.className}>
                <Template ref="form" errors={this.state.errors} fields={this.state.fields}>
                {this.props.children}
                </Template>
            </form>
        )
    }
});


module.exports = ReForm;
