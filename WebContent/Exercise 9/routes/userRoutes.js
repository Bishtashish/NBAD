const express = require('express');
const router = express.Router();
const User = require('../models/user');
const isLoggedIn = require('../controllers/AuthController').isLoggedIn;
const isLoggedOut = require('../controllers/AuthController').isLoggedOut;
const userController = require('../controllers/userController');
router.post('/', userController.postCreate);

router.get('/login',isLoggedOut,userController.logIn);

router.post('/login', userController.postLogIn);

router.get('/create',isLoggedOut,userController.create);


router.get('/profile',isLoggedIn,userController.profile);

router.get('/logout',isLoggedIn, userController.logout);
module.exports = router;
