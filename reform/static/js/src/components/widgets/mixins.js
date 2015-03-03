var InputMixin = {
    getFieldName: function () {
        var fieldName = this.props.field.prefix + "-" + this.props.field.name;
        return fieldName;
    }
};

module.exports = {
    InputMixin: InputMixin
};
