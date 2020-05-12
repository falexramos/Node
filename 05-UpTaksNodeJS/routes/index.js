const express = require('express');
const router = express.Router();

//importadr el controllardor
const proyectoscontroller = require('../controllers/proyectosController');



module.exports = function() {
    //ruta para el home
    router.get('/', proyectoscontroller.proyectosHome);
    router.get('/nuevo-proyecto', proyectoscontroller.formularioProyecto);
    router.post('/nuevo-proyecto', proyectoscontroller.nuevoProyecto);



    return router;

}