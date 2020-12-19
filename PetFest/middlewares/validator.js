const check = require('express-validator').check;

exports.validateRegistration = [
    check('firstName','First Name can not be empty and must contain only Alphabets').trim().isAlpha(),
    check('lastName','Last Name can not be empty and must contain only Alphabets').trim().isAlpha(),
    check('email','Email can not be empty and mus follow email pattern').trim().isEmail().normalizeEmail(),
    check('password','Your password must contain minimum 5 characters').trim().isLength({min:5})
];

exports.validateLogin = [
    check('email','Email can not be empty and must follow email pattern').trim().isEmail().normalizeEmail(),
    check('password','Your password must contain minimum 5 characters').trim().isLength({min:4})
];


exports.validateConnection = [
    check('connectionName','Name should not be empty').trim().notEmpty(),
    check('hostName','Owner should not be empty').trim().notEmpty(),
    check('connectionTopic','Owner should not be empty').trim().notEmpty(),
    check('details','Owner should not be empty').trim().notEmpty(),
    check('dateTime','Date should be onwards current').trim().notEmpty().isDate(),
    check('startTime','End time must be after start time of the event').trim().notEmpty()
    // check('endTime','End time must be after start time of the event').matches(/^(\d|[01]\d|2[0-3])(\:\d{1,2})?$/,"i")
];