const express = require('Express');
var Router = express.Router();
// const Restaurant = require('./models/Restaurant');
const Restaurant = require('../models/Restaurant');
const restaurantController = require('../controllers/restaurantController');
// const createRestaurant = require('../controllers/restaurantController').createRestaurant;
// const deleteRestaurant = require('../controllers/restaurantController').deleteRestaurant;
// const updateRestaurant = require('../controllers/restaurantController').updateRestaurant;
// const postRestaurant = require('../controllers/restaurantController').postRestaurant;
// const getRestaurantUpdate = require('../controllers/restaurantController').getRestaurantUpdate;
// const getRestaurantCreate = require('../controllers/restaurantController').getRestaurantCreate;
// const getRestaurantDetail = require('../controllers/restaurantController').getRestaurantDetail;
// const getAllRestaurants = require('../controllers/restaurantController').getAllRestaurants;


Router.get('/:id', restaurantController.getRestaurantDetail);

Router.get('/', restaurantController.getAllRestaurants);

Router.post('/', restaurantController.postRestaurant);

Router.get('/create', restaurantController.getRestaurantCreate);

Router.delete('/:id', restaurantController.deleteRestaurant);

Router.get('/:id/update', restaurantController.getRestaurantUpdate);

Router.put('/:id', restaurantController.updateRestaurant);



module.exports  = Router;