const express = require('express');
const router = express.Router();
const isLoggedIn = require('../controllers/authController').isLoggedIn;
const connectionController = require('../controllers/connectionController');
const validateConnection = require('../middlewares/validator').validateConnection;


// router.use('/', isLoggedIn);

router.get('/', connectionController.getAllConnections);



router.post('/', isLoggedIn, validateConnection, connectionController.createConnection);

router.get('/create', isLoggedIn, connectionController.getConnectionCreate);

router.get('/:id', connectionController.getConnectionDetail);

router.get('/:id/update', isLoggedIn, connectionController.getConnectionUpdate);

router.put('/:id', isLoggedIn, validateConnection, connectionController.updateConnection);

router.delete('/:id',isLoggedIn, connectionController.deleteConnection);

// router.get('/:id/save', connectionController.saveConnectionToUser);

// router.delete('/:id/delete', connectionController.deleteConnectionFromUser);

module.exports = router;