var React = require('react');

var ErrorList = React.createClass({
    render: function () {
        if (this.props.errors && this.props.errors.length > 0) {
            return (
                <ul>
                {this.props.errors.map(function (error, i) {
                    return <li key={"err-" + i}>{error}</li>
                })}
                </ul>
            )
        }

        return <span/>
    }
});


module.exports = ErrorList;
