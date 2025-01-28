const express= require('express');
const router = require("express").Router();

const TableController = require('../controllers/TableControllers')
const AuthController = require("../controllers/AuthControllers")

router.post("/novo", AuthController.VerificaAutenticacao, AuthController.VerificaADM, TableController.createTable);

router.get("/", TableController.buscarTable)

router.get("/disponibilidade", TableController.buscarTablesDate)

module.exports = router