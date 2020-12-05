const express = require('express');
const router = express.Router();
const isLoggedIn = require('../controllers/authController').isLoggedIn;
const connectionController = require('../controllers/connectionController');

router.use('/', isLoggedIn);

router.get('/', connectionController.getAllConnections);

router.post('/', connectionController.createConnection);

router.get('/create', connectionController.getConnectionCreate);

router.get('/:id', connectionController.getConnectionDetail);

router.get('/:id/update', connectionController.getConnectionUpdate);

router.put('/:id', connectionController.updateConnection);

router.delete('/:id', connectionController.deleteConnection);

// router.get('/:id/save', connectionController.saveConnectionToUser);

// router.delete('/:id/delete', connectionController.deleteConnectionFromUser);

module.exports = router;