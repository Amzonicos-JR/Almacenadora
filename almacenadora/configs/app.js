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
<<<<<<< HEAD
<<<<<<< HEAD
=======
//<<<<<<< HEAD
>>>>>>> jperez-2018495
const accountRoutes = require('../src/account/account.routes');
//=======
const userRoutes = require('../src/user/user.routes')
const serviceRoutes = require('../src/additional services/additionalServices.routes')

<<<<<<< HEAD
>>>>>>> asumpango-2018373
=======
const accountRoutes = require('../src/account/account.routes');
const cellarRoutes = require('../src/cellar/cellar.routes');
>>>>>>> dsalazar-2021181
=======
//>>>>>>> asumpango-2018373
>>>>>>> jperez-2018495

//CONFIGURAR EL SERVIDOR HTTP DE EXPRESS
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
=======
//<<<<<<< HEAD
>>>>>>> jperez-2018495
app.use('/account', accountRoutes);
//=======
app.use('/user', userRoutes);
<<<<<<< HEAD
>>>>>>> asumpango-2018373
=======
app.use('/account', accountRoutes);
app.use('/cellar', cellarRoutes);
>>>>>>> dsalazar-2021181
=======
app.use('/service', serviceRoutes)
//>>>>>>> asumpango-2018373
>>>>>>> jperez-2018495

//Función donde se levanta el servidor
exports.initServer = ()=>{
    app.listen(port);
    console.log(`Server http running in port ${port}`);
}