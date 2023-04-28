'use strict'

require('dotenv').config()
const mongoConfig = require('./configs/mongo');
const app = require('./configs/app');
<<<<<<< HEAD


mongoConfig.connect();
app.initServer();
=======
const userController = require('./src/user/user.controller')

mongoConfig.connect();
app.initServer();
userController.userDefault();
>>>>>>> asumpango-2018373
