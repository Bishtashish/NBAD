const Connection = require('../models/connection');
const User = require('../models/user');
const validationResult = require('express-validator').validationResult;

exports.getUserCreate = (req, res, next) => {
    res.render('users/signUp', { name: 'Welcome to PetFest!' });
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
                res.redirect('/users/logIn')

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
        res.redirect('/users/signUp');
    }

}

exports.getUserLogin = (req, res, next) => {
    res.render('users/logIn', { name: 'Welcome to PetFest!' });
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
                                res.redirect('/index');
                            } else {
                                //Incorrect password
                                req.flash('error', 'Incorrect password!');
                                res.redirect('/users/logIn');
                            }
                        })
                } else {
                    //Incorrect email address
                    req.flash('error', 'Incorrect Email address!');
                    res.redirect('/users/logIn');
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
        res.redirect('/users/logIn');
    }
}

exports.getUserProfile = (req, res, next) => {
    Connection.find({ user: req.session.user.id })
        .then(result => {
            res.render('users/profile', { data: result, name: req.session.user.name + ' Welcome to PetFest!' });
        })
        .catch(err => {
            console.log(err);
            next();
        })
}

exports.getSavedConnections = (req, res, next) => {

    User.findById(req.session.user.id)
        .then(user => {
            if (user) {
                User.findById(req.session.user.id)
                    .populate({ path: 'savedConnection.key', populate: { path: 'savedConnection.key.hostName' } })
                    .then(user1 => {
                        if (user1) {
                            Connection.find({ hostName: req.session.user.id })
                                .then(saveList => {
                                    res.render('users/savedConnections', { conList: user1.savedConnection, saveList, name: req.session.user.name + ' Welcome to PetFest!' });
                                });
                        }
                        else
                            next();
                    });
            }
            else {
                req.flash('error', 'You need to logIn for this operation');
                res.redirect('/users/logIn');
            }
        })
        .catch(err => {
            console.log(err);
            next();
        })
}

exports.deleteConnection = (req, res, next) => {
    User.findById(req.session.user.id)
        .then(user => {
            if (user)
                User.updateOne({_id: req.session.user.id}, { $pull: { savedConnection: { key: req.params.id } } })
                    .then(result => {
                        if (result) {
                            req.flash('success', 'Connection Deleted');
                            res.redirect('/users/savedConnections');
                        }
                        else
                            next();
                    });
            else {
                req.flash('error', 'You need to logIn for this operation');
                res.redirect('/users/logIn');
            }
        })
        .catch(err => {
            console.log(err);
            next();
        })
}

exports.updateConnection = (req, res, next) => {
    User.findById(req.session.user.id)
        .then(user => {
            if (user) {
                // User.findByIdAndUpdate(req.session.user.id, { $push: { savedConnection: req.params.id } })
                // User.find({ _id: req.session.user.id, "savedConnection.key": req.params.id })
                //     .then(found => {
                //         if (found){
                //             console.log("found")
                //             User.updateOne({ _id: req.session.user.id, "savedConnection.key": req.params.id }, { $set: { "savedConnection.$.val": req.params.val } })
                //                 .then(result => {
                //                     if (result) {
                //                         // req.flash('success', 'Connection added');
                //                         res.redirect('/users/savedConnections');
                //                     }
                //                     else
                //                         next();
                //                 });
                //             }
                //         else

                // User.updateOne(
                //     {_id: req.session.user.id},
                //     { $set: { 'savedConnection.key': req.params.id, 'savedConnection.val': req.params.val } },
                //     {
                //         multi: true,
                //         arrayFilters: [{ "savedConnection": { $eq: req.params.id } }]
                //     }
                // ).then(result => {
                //     if (result) {
                //         req.flash('success', 'Connection added');
                //         res.redirect('/users/savedConnections');
                //     }
                //     else
                //         next();
                // });

                User.updateOne({_id:req.session.user.id}, { $pull: { savedConnection: { key: req.params.id }}})
                    .then(saved => {

                        User.updateOne({_id:req.session.user.id}, { $addToSet: { savedConnection: { key: req.params.id, val: req.params.val } } })
                            .then(result => {
                                if (result) {
                                    req.flash('success', 'Connection added');
                                    res.redirect('/users/savedConnections');
                                }
                                else
                                    next();
                            });
                    });
            }
            else {
                req.flash('error', 'You need to logIn for this operation');
                res.redirect('/users/logIn');
            }
        })
        .catch(err => {
            console.log(err);
            next();
        })
}

exports.getUserLogout = (req, res, next) => {
    req.session.destroy(err => {
        // req.flash('success', 'you successfully logedOut');
        res.redirect('/index');
    });
}

