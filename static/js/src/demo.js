var React = require('react');
var Foo = require('./foo').foo;
var Bar = require('./foo').bar;


React.render(
    <Foo />,
    document.getElementById("foo-form")
);

React.render(
    <Bar />,
    document.getElementById("bar-form")
);
