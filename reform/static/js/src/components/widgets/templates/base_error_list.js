var React = require('react');

var ErrorList = React.createClass({
    render: function () {
        if (this.props.errors && this.props.errors.length > 0) {
            var errors = this.props.errors;
            if (!(errors instanceof Array)) {
                errors = [errors];
            }

            return (
                <ul>
                {errors.map(function (error, i) {
                    return <li key={"err-" + i}>{error}</li>
                })}
                </ul>
            )
        }

        return <span/>
    }
});


module.exports = ErrorList;
