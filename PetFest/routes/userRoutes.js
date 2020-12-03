const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { isLoggedIn, isLoggedOut } = require('../controllers/authController');

router.get('/signUp', isLoggedOut, userController.getUserCreate);

router.post('/signUp', isLoggedOut, userController.postUserCreate);

router.get('/logIn', isLoggedOut, userController.getUserLogin);

router.post('/logIn', isLoggedOut, userController.postUserLogin);



router.get('/savedConnections', isLoggedIn, userController.getSavedConnections);

router.put('/savedConnections/:id', isLoggedIn, userController.updateConnection);

router.delete('/savedConnections/:id', isLoggedIn, userController.deleteConnection);

// router.post('/savedConnections',isLoggedIn, userController.postSavedConnections);

router.get('/profile', isLoggedIn, userController.getUserProfile);

router.get('/logout', isLoggedIn, userController.getUserLogout);





module.exports = router;