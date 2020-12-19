const check = require('express-validator').check;

exports.validateRegistration = [
    check('firstName','First Name can not be empty and must contain only Alphabets').trim().isAlpha(),
    check('lastName','Last Name can not be empty and must contain only Alphabets').trim().isAlpha(),
    check('email','Email can not be empty and mus follow email pattern').trim().isEmail().normalizeEmail(),
    check('password','Your password must contain minimum 5 characters').trim().isLength({min:5})
];

exports.validateLogin = [
    check('email','Email can not be empty and mus follow email pattern').trim().isEmail().normalizeEmail(),
    check('password','Your password must contain minimum 5 characters').trim().isLength({min:5})
];


exports.validateRestaurant = [
    check('name','Name should not be empty').trim().notEmpty(),
    check('owner','Owner should not be empty').trim().notEmpty(),
    check('yearFounded','Year founded should be  Numeric and between 1850-2000').trim().notEmpty().isInt({min:1850,max:2000})
];