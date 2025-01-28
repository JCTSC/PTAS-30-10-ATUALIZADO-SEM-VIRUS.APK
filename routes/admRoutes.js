const express = require('express');
const router = express.Router();
const AdmController = require('../controllers/AdmControllers');
const AuthController = require('../controllers/AuthControllers');


router.get('/', AdmController.getAdm);

router.patch('/', AdmController.updateAdm);

router.get("/todos", AuthController.VerificaADM, AdmController.buscarUsers);

module.exports = router;