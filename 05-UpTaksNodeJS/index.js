const express = require('express');
const routes = require('./routes/index');
const path = require('path');
const bodyParser = require('body-parser');


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

//habilitar bodyParser para leer datos del formulario
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/', routes());

app.listen(3000);