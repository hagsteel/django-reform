require('./field');
var React = require('react');
var formManager = require('../form-manager');
var templateManager = require('../template-manager');
var validation = require('../validation');


var DefaultTemplate = React.createClass({
    render: function () {
        var _this = this;
        return (
            <div>
                {this.props.children.map(function (f, i) {
                    var Template = templateManager.getFieldTemplate(f.field.field_type);
                    return <Template key={f.key} field={f.field} errors={_this.props.errors[f.field.name]} />
                })}
                <button type="submit">save</button>
            </div>
        )
    }
});


var ReForm = React.createClass({
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
            <form onSubmit={this.onsubmit}>
                <Template ref="form" errors={this.state.errors} children={this.state.fields}></Template>
            </form>
        )
    }
});


module.exports = ReForm;
