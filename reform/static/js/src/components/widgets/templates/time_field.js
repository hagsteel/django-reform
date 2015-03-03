var React = require('react');
var Input = require('./base_text_input');
var ErrorList = require('./base_error_list');
var InputMixin = require('../mixins').InputMixin;


module.exports = React.createClass({
    mixins: [InputMixin],

    render: function () {
        return (
            <div className="reform-field">
                <label htmlFor={this.props.field.id_field}>{this.props.field.label}</label>
                <Input type="time" field={this.props.field} />
                <div>{this.props.field.help_text}</div>
                <ErrorList errors={this.props.errors} />
            </div>
        )
    }
});
