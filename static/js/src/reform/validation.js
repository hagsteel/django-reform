function validateMaxLength (value, args) {
    if (value.length > args.max_length)
        return "can't be longer than " + args.max_length + " characters.";
    return null;
}


function validateMaxValue (value, args) {
    return value <= args.max_value;
}


var validators = {
    max_length: validateMaxLength
};


function validate (field, value) {
    var i, validationArgs, validator, error, errorMessages = [];

    for (i = 0; i < field.validators.length; i += 1) {
        validationArgs = field.validators[i];
        validator = validators[validationArgs.name];
        error = validator(value, validationArgs);
        if (error) {
            errorMessages.push(error)
        }
    }

    return errorMessages;
}


module.exports = {
    validate: validate
};
