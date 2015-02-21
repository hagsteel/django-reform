var React = require('react');


module.exports = React.createClass({
    render: function () {
        var key_field = this.props.field.key_field;
        var label_field = this.props.field.label_field;

        var props = {};
        if (this.props.field.required) {
            props.required = 'required'
        }
        var field = this.props.field;
        return (
            <div>{field.label}
                {field.choices.map(function (choice, i) {
                    return (
                        <label htmlFor={field.id_field + "_" + i} key={"label-" + i}>
                            <input type="radio" name={field.name} id={field.id_field + "_" + i} key={"opt-" + i} value={choice[key_field]} {...props} />{choice[label_field]}
                        </label>
                    )
                })}
                <div>{this.props.field.help_text}</div>
                <div>{this.props.errors}</div>
            </div>
        )
    }
});
