"use strict";

var forms = {};
var fields = {};
var templates = {};
var templateManager = templateManager || { };


var DefaultFormTemplate = React.createClass({
    render: function () {
        var _this = this;

        return (
            <div>
                {this.props.fields.map(function (f, i) {
                    var Template = templateManager.getFieldTemplate(f.field.field_type);
                    return <Template key={f.key} field={f.field} errors={_this.props.errors[f.field.name]} />
                })}
                {this.props.children}
            </div>
        )
    }
});


templateManager.registerFormTemplate = function (name, template) {
    forms[name] = template;
};


templateManager.getFormTemplate = function (name) {
    var template = forms[name];
    if (template === undefined) {
        return DefaultFormTemplate
    }
    return template
};


templateManager.registerFieldTemplate = function (fieldType, template) {
    fields[fieldType] = template;
};


templateManager.getFieldTemplate = function(fieldType) {
    return fields[fieldType];
};


templateManager.registerTemplate = function (name, template) {
    templates[name] = template;
};


templateManager.getTemplate = function (name) {
    return templates[name];
};


module.exports = templateManager;
