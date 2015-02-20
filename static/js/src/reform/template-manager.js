"use strict";

var forms = {};
var fields = {};
var templateManager = templateManager || { };


templateManager.registerFormTemplate = function (id, template) {
    forms[id] = template;
};

templateManager.getFormTemplate = function (id) {
    return forms[id];
};


templateManager.registerFieldTemplate = function (fieldType, template) {
    fields[fieldType] = template;
};


templateManager.getFieldTemplate = function(fieldType) {
    return fields[fieldType];
};

module.exports = templateManager;
