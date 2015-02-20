var React = require('react');

var Input = React.createClass({
    render: function () {
        var props = {};
        if (this.props.step) {
            props.step = this.props.step;
        }
        if (this.props.field.required) {
            props.required = ''
        }

        return <input
            type={this.props.type}
            name={this.props.field.name}
            id={this.props.field.id_field}
            defaultValue={this.props.value}
            {...props}
        />
    }
});

module.exports = Input