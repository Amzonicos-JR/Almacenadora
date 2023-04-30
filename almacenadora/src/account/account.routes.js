'use strict'

const express = require('express');
const api = express.Router();
const accountController = require('./account.controller');
const { ensureAuth, isAdmin } = require('../services/authenticated');

//Rutas Privadas [ADMIN]
api.get('/test', [ensureAuth, isAdmin], accountController.test)
api.get('/get-accounts', [ensureAuth, isAdmin], accountController.getAccounts)
api.post('/add-account', [ensureAuth, isAdmin], accountController.addAccount)
api.put('/update-account/:id', [ensureAuth, isAdmin], accountController.updateAccount)
api.delete('/delete-account/:id', [ensureAuth, isAdmin], accountController.deleteAccount);

module.exports = api;

