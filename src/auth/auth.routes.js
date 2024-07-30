const express = require('express');
const router = express.Router();

const authController = require('./auth.controller');
const authMiddleware = require('./auth.middleware');
// const authValidator = require('./../middlewares/auth.middleware');

router.post('/login', authController.login);

// router.post('/register', authController.register);

router.get('/profile', authMiddleware.isAuthenticated, authController.profile);

// router.post('/changePassword', authValidator.validateToken, authController.changePassword);

module.exports = router;