'use strict'

const express = require('express');
//Logs de las solicitudes que recibe el servidor
const morgan = require('morgan');
//Aplica seguridad básica al servidor
const helmet = require('helmet');
//Aceptación de solicitudes desde otro sistema o desde la misma máquina
const cors = require('cors');
//Instancia de express
const app = express();
const port = process.env.PORT || 3500;
<<<<<<< HEAD
const accountRoutes = require('../src/account/account.routes');
=======
const userRoutes = require('../src/user/user.routes')

>>>>>>> asumpango-2018373

//CONFIGURAR EL SERVIDOR HTTP DE EXPRESS
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
<<<<<<< HEAD
app.use('/account', accountRoutes);
=======
app.use('/user', userRoutes);
>>>>>>> asumpango-2018373

//Función donde se levanta el servidor
exports.initServer = ()=>{
    app.listen(port);
    console.log(`Server http running in port ${port}`);
}