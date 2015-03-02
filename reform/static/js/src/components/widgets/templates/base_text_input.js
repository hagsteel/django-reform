var React = require('react');

var Input = React.createClass({
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

        return <input
            type={this.props.type}
            name={fieldName}
            id={this.props.field.id_field}
            defaultValue={this.props.field.initial}
            {...props}
        />
    }
});

module.exports = Input