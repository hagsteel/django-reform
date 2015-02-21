var React = require('react');
var Input = require('./base_text_input');
var ErrorList = require('./base_error_list');


module.exports = React.createClass({
    render: function () {
        return (
            <div>
                <label htmlFor={this.props.field.id_field}>{this.props.field.label}</label>
                <Input type="url" field={this.props.field} />
                <div>{this.props.field.help_text}</div>
                <ErrorList errors={this.props.errors} />
            </div>
        )
    }
});
