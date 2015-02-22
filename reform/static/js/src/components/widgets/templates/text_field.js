var React = require('react');
var ErrorList = require('./base_error_list');


module.exports = React.createClass({
    render: function () {
        return (
            <div className="reform-field">
                <label htmlFor={this.props.field.id_field}>{this.props.field.label}</label>
                <textarea name={this.props.field.name} id={this.props.field.id_field} defaultValue={this.props.field.initial}></textarea>
                <div>{this.props.field.help_text}</div>
                <ErrorList errors={this.props.errors} />
            </div>
        )
    }
});
