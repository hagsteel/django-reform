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
        var field = this.props.field;
        return (
            <div className="reform-field">
                {field.label}
                {field.choices.map(function (choice, i) {
                    return (
                        <label htmlFor={field.id_field + "_" + i} key={"label-" + i}>
                            <input type="checkbox" name={this.getFieldName()} id={field.id_field + "_" + i} key={"opt-" + i} value={choice[key_field]} {...props} />{choice[label_field]}
                        </label>
                    )
                })}
                <div>{this.props.field.help_text}</div>
                <ErrorList errors={this.props.errors} />
            </div>
        )
    }
});
