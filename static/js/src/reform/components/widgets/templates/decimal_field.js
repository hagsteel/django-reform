var React = require('react');


module.exports = React.createClass({
    render: function () {
        var steps = this.props.field.decimal_places || "0.01";
        return (
            <div>
                <label htmlFor={this.props.field.id_field}>{this.props.field.label}</label>
                <input type="number" step={steps} name={this.props.field.name} id={this.props.field.id_field} />
                <div>{this.props.field.help_text}</div>
                <div>{this.props.errors}</div>
            </div>
        )
    }
});
