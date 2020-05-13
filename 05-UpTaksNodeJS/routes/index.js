const express = require('express');
const router = express.Router();


// importar express validator
const {body}=require('express-validator/check');




//importadr el controllardor
const proyectoscontroller = require('../controllers/proyectosController');



module.exports = function() {
    //ruta para el home
    router.get('/', proyectoscontroller.proyectosHome);
    router.get('/nuevo-proyecto', proyectoscontroller.formularioProyecto);
    router.post('/nuevo-proyecto', 
        body('nombre').not().isEmpty().trim().escape(),
        proyectoscontroller.nuevoProyecto);

//Listar Proyecto
router.get('/proyectos/:url',proyectoscontroller.proyectoPorUrl);

    return router;

}