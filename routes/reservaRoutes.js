const express = require('express');
const router = express.Router();

const ReservaController = require("../controllers/ReservaControllers");
const AuthController = require("../controllers/AuthControllers");

router.get('/', ReservaController.getReserva);

router.delete("/", ReservaController.cancelReserva);

router.post('/novo', ReservaController.registerReserva);

router.get('/listar', AuthController.VerificaADM, ReservaController.buscarReservaDate)

module.exports = router;