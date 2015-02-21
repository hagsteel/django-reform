var React = require('react');
var ErrorList = require('./base_error_list');


module.exports = React.createClass({
    render: function () {
        return (
            <div>
                <label htmlFor={this.props.field.id_field}>{this.props.field.label}</label>
                <textarea name={this.props.field.name} id={this.props.field.id_field}></textarea>
                <div>{this.props.field.help_text}</div>
                <ErrorList errors={this.props.errors} />
            </div>
        )
    }
});
