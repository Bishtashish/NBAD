const User = require('../models/user');


exports.logIn = (req, res,next) => {
    res.render('./users/login', { name: 'Fast Food Inc!' });
}

exports.postCreate = (req, res, next) => {
    let user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password
    });
    user.save()
    .then(result => {
        res.redirect('/')
    
});
}

exports.postLogIn = (req, res, next) => {
    User.findOne({email: req.body.email})
    .then( user =>{
        console.log(user);
        if(user === undefined) 
        user.redirect('/users/login');
        else 
        user.comparePassword(req.body.password)
        .then(result1 => {

            console.log(result1);
                if(result1 == true){
                    req.session.user = { id: user._id, name: user.firstName };
                    res.redirect('/');

                } 
                else res.redirect('/users/login');
            })
    })
    .catch(err => {
        console.log(err);
            next();
    });
}

exports.create = (req, res, next) =>{
    res.render('./users/create', { name: 'Fast Food Inc!' });
}
exports.profile = (req, res, next) =>{
    res.render('./users/profile',{ name: req.session.user.name });
}

exports.logout = (req, res, next) =>{
    // res.render('./users/profile',{ name: 'Fast Food Inc!' });
    req.session.destroy();
    res.render('./index',{ name: 'Fast Food Inc!' });
}