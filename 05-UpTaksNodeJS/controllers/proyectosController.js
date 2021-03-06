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

exports.formularioProyecto = async (req, res) => {
    const proyectos=await Proyectos.findAll();
    res.render('nuevoProyecto', {
        nombrePagina: 'Nuevo Proyecto',
        proyectos
    });
}

exports.nuevoProyecto = async (req, res) => {
        //pasamos todos los proyectos a la vista
        const proyectos=await Proyectos.findAll();
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
                errores,
                proyectos
            })
        }else {
            //para cuendo no hay errores
            //inserta en la DB.
            const proyecto = await Proyectos.create({nombre});
            res.redirect('/');                
        }

    }

    exports.proyectoPorUrl= async(req,res,next)=>{
        const proyectosPromise= Proyectos.findAll();
        const proyectoPromise=await Proyectos.findOne({
            where:{
                url: req.params.url
            }
        });
    const [proyectos,proyecto]=await Promise.all([proyectosPromise,proyectoPromise]);
    

        if(!proyecto) return next();
       
        //vamos a dar render a la vista, pasar a otra vista
        //pasamos el proyecto y los proyectos
        res.render('tareas',{
            nombrePagina: 'Tareas del Proyecto',
            proyecto,
            proyectos
        });


    }

exports.formularioEditar=async (req,res)=>{
    const proyectosPromise= Proyectos.findAll();
    const proyectoPromise=await Proyectos.findOne({
        where:{
            id:req.params.id
        }
    });
const [proyectos,proyecto]=await Promise.all([proyectosPromise,proyectoPromise]);


    //redern a la vista
 
    res.render('nuevoProyecto',{
        nombrePagina:'Editar Proyecto',
        proyectos,
        proyecto

    })
}


exports.actualizarProyecto = async (req, res) => {
    //pasamos todos los proyectos a la vista
    const proyectos=await Proyectos.findAll();
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
            errores,
            proyectos
        })
    }else {
        //para cuendo no hay errores
        //inserta en la DB.
         await Proyectos.update(
             {nombre: nombre},
             {where: {id: req.params.id}}
             );
        res.redirect('/');                
    }

}
