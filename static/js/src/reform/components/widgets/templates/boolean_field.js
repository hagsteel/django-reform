var React = require('react');


module.exports = React.createClass({
    render: function () {
        return (
            <div>
                <label htmlFor={this.props.field.id_field}>{this.props.field.label}</label>
                <input type="checkbox" name={this.props.field.name} id={this.props.field.id_field} value={true} />
                <div>{this.props.field.help_text}</div>
                <div>{this.props.errors}</div>
            </div>
        )
    }
});
