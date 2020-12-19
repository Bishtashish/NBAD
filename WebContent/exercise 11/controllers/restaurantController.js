const Restaurant = require('../models/restaurant');
const validationResult = require('express-validator').validationResult;

exports.getAllRestaurants = (req, res, next) => {
    Restaurant.find()
        .then(result => {
            res.render('./restaurants/restaurants', { data: result, name: 'Fast Food Inc!' });
        })
        .catch(err => {
            console.log(err);
            next();
        });
}

exports.getRestaurantDetail = (req, res, next) => {
    Restaurant.findById(req.params.id)
        .populate('user', 'firstName')
        .then(result => {
            if (result)
                res.render('./restaurants/restaurant', { data: result, name: result.name });
            else
                next();
        })
        .catch(err => {
            console.log(err);
            next();
        });
}

exports.getRestaurantCreate = (req, res) => {
    res.render('./restaurants/create', { name: 'Fast Food Inc!' });
}

exports.getRestaurantUpdate = (req, res, next) => {
    Restaurant.findById(req.params.id)
        .then(result => {
            if (result && result.user == req.session.user.id)
                res.render('./restaurants/update', { data: result, name: 'Fast Food Inc!' });
            else{
                req.flash('error','you are not authorized to view');
                res.redirect('/restaurants');}

        })
        .catch(err => {
            console.log(err);
            next();
        });
}

exports.createRestaurant = (req, res, next) => {

    const errors = validationResult(req);
    console.log(errors.array());
    if (errors.isEmpty()) {


    let restaurant = new Restaurant({
        name: req.body.name,
        yearFounded: req.body.yearFounded,
        owner: req.body.owner,
        imageURL: req.body.imageURL,
        user: req.session.user.id
    });
    restaurant.save()
        .then(result => {
            req.flash('success','You created Restaurant Successfully');
            res.redirect('/restaurants');
        })
        .catch(err => {
            console.log(err);
            next();
        });
    }
    else{
        errors.array().forEach((error) => {
            req.flash('error', error.msg);
        });
        res.redirect('/restaurants/create');
    }
}

exports.updateRestaurant = (req, res, next) => {



    const errors = validationResult(req);
    console.log(errors.array());
    if (errors.isEmpty()) {

    let restaurantParams = {
        name: req.body.name,
        yearFounded: req.body.yearFounded,
        owner: req.body.owner,
        imageURL: req.body.imageURL
    };
    Restaurant.findById(req.params.id)
        .then(result => {
            if (result && result.user == req.session.user.id){
                req.flash('success','You updated Restaurant Successfully');
                return Restaurant.findByIdAndUpdate(req.params.id, { $set: restaurantParams });}
            else
            {   req.flash('error','you are not authorized to update');
                res.redirect('/restaurants');}
        })
        .then(result => {
            res.redirect('/restaurants/' + req.params.id);
        })
        .catch(err => {
            console.log(err);
            next();
        });
    }
    else{
        errors.array().forEach((error) => {
            req.flash('error', error.msg);
        });
        res.redirect('/restaurants/' + req.params.id +'/update?');
    }

}

exports.deleteRestaurant = (req, res, next) => {
    Restaurant.findById(req.params.id)
        .then(result => {
            if (result && result.user == req.session.user.id){
                req.flash('success','you successfully deleted the restaurant');
                return Restaurant.findByIdAndDelete(req.params.id);}
            else{
                req.flash('error','you are not authorized to delete');
                res.redirect('/restaurants');}
        })
        .then(result => {
            res.redirect('/restaurants/');
        })
        .catch(err => {
            console.log(err);
            next();
        });

}