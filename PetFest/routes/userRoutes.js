const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { isLoggedIn, isLoggedOut } = require('../controllers/authController');
const validateRegistration = require('../middlewares/validator').validateRegistration;
const validateLogin = require('../middlewares/validator').validateLogin;

router.get('/signUp', isLoggedOut, userController.getUserCreate);

router.post('/signUp', isLoggedOut, validateRegistration, userController.postUserCreate);

router.get('/logIn', isLoggedOut, userController.getUserLogin);

router.post('/logIn', isLoggedOut, validateLogin, userController.postUserLogin);

router.get('/logOut', isLoggedIn, userController.getUserLogout);




router.get('/savedConnections', isLoggedIn, userController.getSavedConnections);

router.put('/savedConnections/:id/:val', isLoggedIn, userController.updateConnection);

router.delete('/savedConnections/:id', isLoggedIn, userController.deleteConnection);

// router.post('/savedConnections',isLoggedIn, userController.postSavedConnections);

router.get('/profile', isLoggedIn, userController.getUserProfile);






module.exports = router;