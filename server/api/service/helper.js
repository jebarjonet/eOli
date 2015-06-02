module.exports.notFound = notFound;
module.exports.missingParameter = missingParameter;
module.exports.formError = formError;
module.exports.mongooseError = mongooseError;
module.exports.notAllowed = notAllowed;

function notFound(what) {
    return {
        status: 404,
        message: what ? what + ' not found.' : 'Not found.'
    };
}

function missingParameter(parameter) {
    return {
        status: 400,
        error: 'missing_parameter',
        message: 'Required parameter is missing: ' + parameter
    };
}

function formError(err) {
    for(var field in err.errors) {
        if(err.errors.hasOwnProperty(field)) {
            err.errors[field] = err.errors[field].message;
        }
    }

    return {
        status: 400,
        message: 'Form data is not valid.',
        errors: err.errors
    };
}

function mongooseError(err) {
    if(err.name === 'ValidationError') {
        return formError(err);
    } else {
        return {
            error: 'mongoose_error',
            message: err.message
        };
    }
}

function notAllowed(message) {
    return {
        status: 400,
        error: 'not_allowed',
        message: message || 'Action not allowed.'
    };
}