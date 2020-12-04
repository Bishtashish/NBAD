const Connection = require('../models/connection');
const User = require('../models/user');

exports.getUserCreate = (req, res, next) => {
    res.render('users/signUp', { name: 'Welcome to PetFest!' });
}

exports.postUserCreate = (req, res, next) => {
    let user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
    });
    user.save()
        .then(result => {
            res.redirect('/users/logIn')

        })
        .catch(err => {
            console.log(err);
            next();
        });
}

exports.getUserLogin = (req, res, next) => {
    res.render('users/logIn', { name: 'Welcome to PetFest!' });
}


exports.postUserLogin = (req, res, next) => {
    let email = req.body.email;
    let password = req.body.password;
    User.findOne({ email: email })
        .then(user => {
            if (user) {
                user.comparePassword(password)
                    .then(isMatch => {
                        if (isMatch) {
                            req.session.user = { id: user._id, name: user.firstName };
                            res.redirect('/index');
                        } else {
                            //Incorrect password
                            res.redirect('/users/logIn');
                        }

                    })
            } else {
                //Incorrect email address
                res.redirect('/users/logIn');
            }
        })
        .catch(err => {
            console.log(err);
            next();
        });
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

    // Connection.find({ user: req.session.user.id})
    // .then(result =>{
    //     res.render('.users/profile',{data: result, name: 'Welcome to PetFest!'});
    // })
    // .catch(err => {
    //     console.log(err);
    //     next();
    // })
    User.findById(req.session.user.id)
        // .populate('savedConnections','')
        .then(user => {
            if (user) {
                // console.log(user)        
                User.findById(req.session.user.id)
                    // .populate('savedConnection')
                    .populate({ path: 'savedConnection', populate: { path: 'hostName' } })

                    .then(user1 => {
                        // console.log(user1);
                        if (user1) {
                            Connection.find({ hostName: req.session.user.id })
                            .then(saveList =>{    
                                res.render('users/savedConnections', { conList: user1.savedConnection, saveList, name: req.session.user.name + ' Welcome to PetFest!' });
                            });  
                        }
                        else
                            next();
                    });
            }
            else
                res.redirect('/users/logIn');
        })
        .catch(err => {
            console.log(err);
            next();
        })
}

exports.deleteConnection = (req, res, next) => {
    User.findById(req.session.id)
        .then(user => {
            if (user)
                User.findByIdAndUpdate(req.params.id, { $pull: { savedConnection: req.params.id } })
                    .then(result => {
                        if (result)
                            res.redirect('/users/savedConnections');
                        else
                            next();
                    });
            else
                res.redirect('/users/logIn');
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
                console.log("in update found user")
                User.findByIdAndUpdate(req.session.user.id, { $push: { savedConnection: req.params.id } })
                    .then(result => {
                        if (result) {
                            console.log("in update found user updated connections");
                            res.redirect('/users/savedConnections');
                        }
                        else
                            next();
                    });
            }
            else
                res.redirect('/users/logIn');
        })
        .catch(err => {
            console.log(err);
            next();
        })
}

exports.getUserLogout = (req, res, next) => {
    req.session.destroy(err => {
        res.redirect('/index');
    });
}

