var React = require('react');
var Input = require('./base_text_input');


module.exports = React.createClass({
    render: function () {
        var steps = this.props.field.decimal_places || "0.01";
        return (
            <div>
                <label htmlFor={this.props.field.id_field}>{this.props.field.label}</label>
                <Input type="number" step={steps} field={this.props.field} />
                <div>{this.props.field.help_text}</div>
                <div>{this.props.errors}</div>
            </div>
        )
    }
});
