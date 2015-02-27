var React = require('react');
var Input = require('./base_text_input');
var ErrorList = require('./base_error_list');


module.exports = React.createClass({
    render: function () {
        return (
            <div className="reform-field">
                <button defaultValue={this.props.field.initial} type="submit">{this.props.field.label}</button>
            </div>
        )
    }
});
