var React = require('react');
var ErrorList = require('./base_error_list');


module.exports = React.createClass({
    render: function () {
        var key_field = this.props.field.key_field;
        var label_field = this.props.field.label_field;

        var props = {};
        if (this.props.field.required) {
            props.required = 'required'
        }

        return (
            <div>
                <label htmlFor={this.props.field.id_field}>{this.props.field.label}</label>
                <select name={this.props.field.name} id={this.props.field.id_field} defaultValue={this.props.field.initial} {...props}>
                {this.props.field.choices.map(function (choice, i) {
                    return <option key={"opt-" + i} value={choice[key_field]}>{choice[label_field]}</option>
                })}
                </select>
                <div>{this.props.field.help_text}</div>
                <ErrorList errors={this.props.errors} />
            </div>
        )
    }
});
