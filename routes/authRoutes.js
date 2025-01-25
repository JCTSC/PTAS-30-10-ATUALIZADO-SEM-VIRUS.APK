const express = require('express');
const router = express.Router();

const AuthController = require('../controllers/AuthControllers')

router.post('/login', AuthController.login)

router.post('/cadastrar', AuthController.cadastrar)

module.exports = router