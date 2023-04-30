'use strict'

const express = require('express');
const api = express.Router();
const leaseController = require('./lease.controller')
const { ensureAuth, isAdmin } = require('../services/authenticated');

//Ruta de testeo
api.get('/test', [ensureAuth, isAdmin], leaseController.test)

//Rutas públicas
api.post('/add', leaseController.add)

//Rutas privadas
//Rutas privadas solo para administrador

module.exports = api;