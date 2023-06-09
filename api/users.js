const UserController = require('../controller/users');
const express = require('express');
const router = express.Router();
router.get('/all', UserController.findAllUsers);
router.get('/findAllGeoUsers', UserController.findAllGeoUsers);
router.get('/:id', UserController.findById);
router.post('/add', UserController.addUser);
router.post('/updateUserLocation', UserController.updateUserLocation);
router.post('/updUserLocation', UserController.updUserLocation);
router.post('/removebyid/:id', UserController.removeById);
router.get('/byusername/:username', UserController.findByUsername);




module.exports = router;