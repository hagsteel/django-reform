var React = require('react');
var ErrorList = require('./base_error_list');
var InputMixin = require('../mixins').InputMixin;


module.exports = React.createClass({
    mixins: [InputMixin],

    render: function () {
        var key_field = this.props.field.key_field;
        var label_field = this.props.field.label_field;

        var props = {};
        if (this.props.field.required) {
            props.required = 'required'
        }

        if (this.props.onChange) {
            props.onChange = this.props.onChange;
        }

        if (this.props.multi) {
            props.multiple = 'multiple';
        }

        return (
            <div className="reform-field">
                <label htmlFor={this.props.field.id_field}>{this.props.field.label}</label>
                <select name={this.getFieldName()} id={this.props.field.id_field} defaultValue={this.props.field.initial} {...props}>
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
