var React = require('react');


module.exports = React.createClass({
    render: function () {
        var key_field = this.props.field.key_field;
        var label_field = this.props.field.label_field;

        return (
            <div>
                <label htmlFor={this.props.field.id_field}>{this.props.field.label}</label>
                <select name={this.props.field.name} id={this.props.field.id_field}>
                {this.props.field.choices.map(function (choice, i) {
                    return <option key={"opt-" + i} value={choice[key_field]}>{choice[label_field]}</option>
                })}
                </select>
                <div>{this.props.field.help_text}</div>
                <div>{this.props.errors}</div>
            </div>
        )
    }
});
