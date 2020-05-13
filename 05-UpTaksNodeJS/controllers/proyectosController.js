const Proyectos = require('../models/Proyectos');
const slug =require('slug');


exports.proyectosHome = async(req, res) => {
    //mostrando todos los proyectos que estan en la base de datos
    const proyectos=await Proyectos.findAll();

    // se pasan a la vista los datos recuperados de la db en const proyectos
    res.render('index', {
        nombrePagina: 'Proyectos',
        proyectos
    });
}

exports.formularioProyecto = (req, res) => {

    res.render('nuevoProyecto', {
        nombrePagina: 'Nuevo Proyecto'
    });
}

exports.nuevoProyecto = async (req, res) => {
        //enviar a la consola lo que el usuario escriba
        //console.log(req.body);
        //validar que los input tengan datos
        const { nombre } = req.body;
        let errores = [];
        
        if (!nombre) {
            errores.push({'texto': 'Agrega un nombre al proyecto'});
        }
        //si hay errores
        
        if (errores.length > 0){
            res.render('nuevoProyecto',{
                nombrePagina: 'Nuevo Proyecto',
                errores
            })
        }else {
            //para cuendo no hay errores
            //inserta en la DB.
            const proyecto = await Proyectos.create({nombre});
            res.redirect('/');                
        }

    }




    