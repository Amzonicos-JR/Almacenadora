'use strict'

const express = require('express');
const api = express.Router();
const leaseController = require('./lease.controller')
const { ensureAuth, isAdmin } = require('../services/authenticated');

//Ruta de testeo
api.get('/test', [ensureAuth, isAdmin], leaseController.test)

//Rutas privadas
//Rutas privadas solo para administrador
api.post('/add', [ensureAuth, isAdmin], leaseController.add)
api.delete('/delete/:id',[ensureAuth, isAdmin], leaseController.delete)
api.get('/get', [ensureAuth, isAdmin], leaseController.get)
api.put('/update/:id', [ensureAuth, isAdmin], leaseController.update)

module.exports = api;