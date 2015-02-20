var React = require('react');


var FooTemplate = React.createClass({
    render: function () {
        return (
            <div>
                <div>I has label</div>
                <div><input type="text" name="bar" id="bar" ref="bar" /></div>
                <div>{this.props.errors.bar}</div>

                <div><input type="text" name="name" id="name" ref="name" /></div>
                <div>{this.props.errors.name}</div>

                <div><input type="text" name="name" id="name" ref="hest" /></div>
                <div>{this.props.errors.hest}</div>

                <button type="submit">save</button>
            </div>
        )
    }
});


module.exports = FooTemplate;
