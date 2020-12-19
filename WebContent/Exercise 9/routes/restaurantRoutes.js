const express = require('express');
const router = express.Router();
const isLoggedIn = require('../controllers/AuthController').isLoggedIn;
const restaurantController = require('../controllers/restaurantController');

router.use('/', isLoggedIn);
router.get('/', restaurantController.getAllRestaurants);

router.post('/', restaurantController.createRestaurant);

router.get('/create', restaurantController.getRestaurantCreate);

router.get('/:id', restaurantController.getRestaurantDetail);

router.get('/:id/update', restaurantController.getRestaurantUpdate);

router.put('/:id', restaurantController.updateRestaurant);

router.delete('/:id', restaurantController.deleteRestaurant);

module.exports = router;