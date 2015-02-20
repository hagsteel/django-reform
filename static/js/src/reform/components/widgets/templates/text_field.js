var React = require('react');


module.exports = React.createClass({
    render: function () {
        return (
            <div>
                <label htmlFor={this.props.field.id_field}>{this.props.field.label}</label>
                <textarea name={this.props.field.name} id={this.props.field.id_field}></textarea>
                <div>{this.props.field.help_text}</div>
                <div>{this.props.errors}</div>
            </div>
        )
    }
});
