"use strict";

var forms = {};
var fields = {};
var templates = {};
var templateManager = templateManager || { };


templateManager.registerFormTemplate = function (name, template) {
    if (name in forms)
        return;
    forms[name] = template;
};

templateManager.getFormTemplate = function (name) {
    return forms[name];
};


templateManager.registerFieldTemplate = function (fieldType, template) {
    if (fieldType in fields)
        return;
    fields[fieldType] = template;
};


templateManager.getFieldTemplate = function(fieldType) {
    return fields[fieldType];
};


templateManager.registerTemplate = function (name, template) {
    if (name in templates)
        return;
    templates[name] = template;
};


templateManager.getTemplate = function (name) {
    return templates[name];
};


module.exports = templateManager;
