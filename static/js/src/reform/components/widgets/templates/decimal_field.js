var React = require('react');
var Input = require('./base_text_input');


module.exports = React.createClass({
    decimalPlacesToSteps: function () {
        var decimalPlaces = this.props.field.decimal_places,
            i, result, decArray = [];

        if (decimalPlaces === null) {
            return "0.01";
        }

        if (decimalPlaces > 0) {
            for (i = 0; i < decimalPlaces; i += 1) {
                decArray.push("0");
            }
            decArray.splice(1, 0, ".");
        }
        decArray.push("1");
        result = decArray.join("");
        return result;
    },

    render: function () {
        var step = this.decimalPlacesToSteps();
        return (
            <div>
                <label htmlFor={this.props.field.id_field}>{this.props.field.label}</label>
                <Input type="number" step={step} field={this.props.field} />
                <div>{this.props.field.help_text}</div>
                <div>{this.props.errors}</div>
            </div>
        )
    }
});
