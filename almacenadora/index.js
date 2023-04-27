'use strict'

require('dotenv').config()
const mongoConfig = require('./configs/mongo');
const app = require('./configs/app');
const categoryController = require('./src/user/user.controller');

mongoConfig.connect();
app.initServer();
categoryController.userDefault();