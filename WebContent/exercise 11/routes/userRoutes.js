const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { isLoggedIn, isLoggedOut } = require('../middlewares/authorization');
const validateRegistration = require('../middlewares/validator').validateRegistration;
const validateLogin = require('../middlewares/validator').validateLogin;


router.get('/create', isLoggedOut, userController.getUserCreate);

router.post('/',  isLoggedOut, validateRegistration, userController.postUserCreate);

router.get('/login', isLoggedOut, userController.getUserLogin);

router.post('/login', isLoggedOut, validateLogin, userController.postUserLogin);

router.get('/profile', isLoggedIn, userController.getUserProfile);

router.get('/logout', isLoggedIn, userController.getUserLogout);

module.exports = router;