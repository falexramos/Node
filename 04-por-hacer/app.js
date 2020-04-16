const argv = requiere('./config/yargs').argv;
const colors = require('colors');

const porHacer = requiere('./por-hacer/por-hacer');
console.log(argv);


let comando = argv._[0];

switch (comando) {

    case 'crear':
        let tarea = porHacer.crear(argv.descripcion);
        console.log(tarea);
        break;

    case 'listar':
        let listado = porHacer.getListado();

        for (let tarea of listado) {
            console.log('=========Por Hacer===============');
            console.log(tarea.descripcion);
            console.log('estado: ', tarea.completado);
            console.log('=================================');
        }

        console.log('Mostrar todas las tareas por hacer');
        break;

    case 'actualizar':

        let actualizado = porHacer.actualizar(argv.descripcion, argv.completado)
        console.log(actualizado);
        break;

    default:
        console.log('comando no es conocio');


}