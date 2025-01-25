const express = require('express');
const router = express.Router();
const AdminController = require('../controllers/AdmControllers');

router.delete('/delete-user/:userId', AdminController.deleteUser);

router.delete('/delete-table/:tableName', AdminController.deleteTable);

router.post('/add-table', AdminController.addTable);

router.post('/cancel-reservation', AdminController.cancelReservation);

router.get("/tables", AdminController.getAllTables);

module.exports = router;