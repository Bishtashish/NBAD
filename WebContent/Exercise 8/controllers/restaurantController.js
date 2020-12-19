const express = require('Express');
const Restaurant = require('../models/Restaurant');


exports.getAllRestaurants=(req, res, next)=>{
    Restaurant.find()
        .then(result => {
            res.render('restaurants', { restaurants: result, name: 'Fast Food Inc!' });
        })
        .catch(err => {
            console.log(err);
            next();
        })
}


exports.getRestaurantDetail=(req, res, next)=>{
    id = req.params.id;
    Restaurant.findById(req.params.id)
        .then(result => {
            res.render('restaurant', { restaurant: result, name: result.name });
        })
        .catch(err => {
            console.log(err);
            next();
        });
}

exports.getRestaurantCreate=(req, res)=>{
    res.render('create', { name: 'Fast Food Inc!' });
}


exports.getRestaurantUpdate=(req, res, next)=>{
    Restaurant.findById(req.params.id)
        .then(result => {
            res.render('update', { restaurant: result, name: 'Fast Food Inc!' });
        })
        .catch(err => {
            console.log(err);
            next();
        })
}

exports.postRestaurant=(req, res, next)=>{
    let restaurant = new Restaurant({
        name: req.body.name,
        yearFounded: req.body.yearFounded,
        owner: req.body.owner,
        imageURL: req.body.imageURL
    });
    restaurant.save()
        .then(result => {
            res.redirect('/restaurants');
        })
        .catch(err => {
            console.log(err);
            next();
        });
}

exports.updateRestaurant=(req, res, next)=>{

    Restaurant.findByIdAndUpdate(req.params.id, {$set:req.body})
    // Restaurant.findByIdAndUpdate(req.params.id, req.body)
    .then(result => {
            res.redirect('/restaurants/'+req.params.id);
        })
    .catch(err => {
        console.log(err);
            next();
    })
}

exports.deleteRestaurant=(req, res, next)=> {
    id = req.params.id;
    Restaurant.findByIdAndDelete(id)
    .then(result => {
        res.redirect('/restaurants');
    })
    .catch(err => {
        console.log(err);
            next();
    })
    // app.delete(id);
}
// module.exports = deleteRestaurant();
// module.exports = updateRestaurant();
// module.exports = postRestaurant();
// module.exports = getRestaurantUpdate();
// module.exports = createRestaurant();
// module.exports = getRestaurantCreate();
// module.exports = getRestaurantDetail();
// module.exports = getAllRestaurants();



