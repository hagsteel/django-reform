var formManager = formManager || {};

var forms = {};

formManager.digestForms = function() {
    var key, form, formSelectorClass, targets;

    for (key in window.reforms) {
        form = window.reforms[key];
        forms[key] = form;
    }
};

formManager.getForm = function (name, opts) {
    var form = forms[name]
    //opts = opts || {};
    //var formKey = opts.key || "form-" + Date.now();
    //var initial = opts.initial;
    //var create = opts.create;
    //var update = opts.update;
    //var parent = opts.parent;
    //
    //if (opts.initial !== undefined) {
    //    var initial = JSON.parse(JSON.stringify(opts.initial)); // <-- Clone the initial
    //}

    if (form === undefined) {
        return form;
    }

    return JSON.parse(JSON.stringify(forms[name]));
};

formManager.digestForms();

module.exports = {
    getForm: formManager.getForm
};
