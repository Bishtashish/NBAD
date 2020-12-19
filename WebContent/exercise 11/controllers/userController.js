const User = require('../models/user');
const Restaurant = require('../models/restaurant');
const validationResult = require('express-validator').validationResult;

exports.getUserCreate = (req, res, next) => {
    res.render('./users/create', { name: 'Fast Food Inc!' });
}

exports.postUserCreate = (req, res, next) => {

    const errors = validationResult(req);
    console.log(errors.array());
    if (errors.isEmpty()) {

        let user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password
        });
        user.save()
            .then(result => {
                req.flash('success', 'User Created');
                res.redirect('/');
            })
            .catch(err => {
                console.log(err);
                // req.flash('error', 'User Creation failed');
                next();
            });
    }
    else {
        errors.array().forEach((error) => {
            req.flash('error', error.msg);
        });
        res.redirect('/users/create');
    }
}

exports.getUserLogin = (req, res, next) => {
    res.render('./users/login', { name: 'Fast Food Inc!' });
}

exports.postUserLogin = (req, res, next) => {

    const errors = validationResult(req);
    console.log(errors.array());
    if (errors.isEmpty()) {

    let email = req.body.email;
    let password = req.body.password;
    User.findOne({ email: email })
        .then(user => {
            if (user) {
                user.comparePassword(password)
                    .then(isMatch => {
                        if (isMatch) {
                            req.flash('success', 'logIn Successfull');
                            req.session.user = { id: user._id, name: user.firstName };
                            res.redirect('/');
                        } else {

                            req.flash('error', 'Incorrect password!');
                            console.log('Incorrect password!');
                            // console.log(res.locals.errorMessages);

                            res.redirect('/users/login');
                        }

                    })
            } else {
                req.flash('error', 'Incorrect Email address!');
                console.log('Incorrect email address!');

                res.redirect('/users/login');
            }
        })
        .catch(err => {
            console.log(err);
            next();
        });
    }
    else {
        errors.array().forEach((error) => {
            req.flash('error', error.msg);
        });
        res.redirect('/users/login');
    }

}

exports.getUserProfile = (req, res, next) => {
    // console.log('error', res.locals.errorMessages);
    // console.log('success', res.locals.successMessages);
    Restaurant.find({ user: req.session.user.id })
        .then(result => {
            res.render('./users/profile', { restaurants: result, name: 'Fast Food Inc!' });
        })
        .catch(err => {
            console.log(err);
            next();
        });
}


exports.getUserLogout = (req, res, next) => {
    req.session.destroy(err => {
        res.redirect('/');
    });
}