var React = require('react');
//var ReForm = require('django-reform').ReForm;
require('djangoReform');
//var ReForm = require('django-reform').ReForm;

//var TemplateManager = require('django-reform').TemplateManager;
//console.log(TemplateManager.meh());

//var fooTemplate = require('./templates/foo.js');
//TemplateManager.registerFormTemplate("foo-form", fooTemplate);


//var Foo = React.createClass({
//    submit: function () {
//        console.log('submitted foo');
//    },
//
//    custom: function () {
//        this.refs.form.clear();
//    },
//
//    render: function () {
//        return (
//            <div>
//                <ReForm form="foo-form" onsubmit={this.submit} ref="form" />
//                <button type="button" onClick={this.custom}>custom</button>
//            </div>
//        )
//    }
//});


var Bar = React.createClass({
    submit: function () {
        console.log('submitted bar');
    },

    render: function () {
        //<ReForm form="bar-form" onsubmit={this.submit} />
        return (
            <span>lo</span>
        )
    }
});


module.exports = {
    //foo: Foo,
    bar: Bar
};
