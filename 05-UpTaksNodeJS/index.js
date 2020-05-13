const express = require('express');
const routes = require('./routes/index');
const path = require('path');
const bodyParser = require('body-parser');


//helpers con las funciones creadas
const helpers=require('./views/helpers');


//crear la conexión a la base de datos
const db = require('./config/db');

//Importar el modelo

require('./models/Proyectos');

db.sync()
    .then(()=>console.log('conectado al servidor'))
    .catch(error => console.log(error))

// crear una app de espress

const app = express();

// donde Cargar los archivos estaticos
app.use(express.static('public'));

//habilitar pug
app.set('view engine', 'pug');

// Añadir la carpeta de las vistas

app.set('views', path.join(__dirname, './views'));

//pasar vardump para que se vea en toda la aplicacion

app.use((rep,res,next)=>{
    res.locals.vardump=helpers.vardump;
    next();
});

//habilitar bodyParser para leer datos del formulario
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/', routes());

app.listen(3000);