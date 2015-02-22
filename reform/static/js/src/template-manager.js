"use strict";

var forms = {};
var fields = {};
var templates = {};
var templateManager = templateManager || { };


templateManager.registerFormTemplate = function (name, template) {
    forms[name] = template;
};

templateManager.getFormTemplate = function (name) {
    return forms[name];
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
