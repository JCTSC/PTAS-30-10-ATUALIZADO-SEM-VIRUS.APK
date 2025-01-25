const express= require('express');
const router = express.Router();

const TableController = require('../controllers/TableControllers')

router.get('/reservas', TableController.Reservas)

router.get('/grid', TableController.fetchTableGrid);

router.post('/grid', TableController.createTableGrid);

router.post('/reserve', TableController.reserveTable);

router.get('/reservas/:userId', TableController.listUserReservations);

router.post('/reservas/cancelar', TableController.cancelReservation);

module.exports = router