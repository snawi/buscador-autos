import {autos} from './autos-array'


/* variables */
const marca = document.querySelector('#marca');
const year = document.querySelector('#year');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color');


const resultado = document.querySelector('#resultado');




/* genera el año actual */
const max = new Date().getFullYear();
/* le restamos los años en que queramos terminar  */
const min = max -10;



/* generamos el objeto con sus variables vacias */
const datosBusqueda = {
    marca : '',
    year : '',
    minimo: '',
    maximo: '',
    puertas: '',
    transmision: '',
    color: ''
}




/* ______________________________________________________________________________________________________ */




/* eventos */

document.addEventListener('DOMContentLoaded', () => {
    mostrarAutos( autos ); // me trae los autos al cargar 

    
    llenarSelect(); // llenar el select del año



})


/* un evento para cada campo select, en este caso un evento de cambio */
marca.addEventListener('change', e => {
    datosBusqueda.marca = e.target.value;
    filtrarAuto()
    /*  console.log(datosBusqueda) */
})

year.addEventListener('change', e => {
    datosBusqueda.year = e.target.value;
   /* console.log(datosBusqueda) */
   filtrarAuto()
})

minimo.addEventListener('change', e => {
    datosBusqueda.minimo = e.target.value;
   /* console.log(datosBusqueda) */
   filtrarAuto()
})

maximo.addEventListener('change', e => {
    datosBusqueda.maximo = e.target.value;
   /* console.log(datosBusqueda) */

   filtrarAuto()
})

puertas.addEventListener('change', e => {
    datosBusqueda.puertas = parseInt( e.target.value);
   /* console.log(datosBusqueda) */

   filtrarAuto()
})

transmision.addEventListener('change', e => {
    datosBusqueda.transmision = e.target.value;
   /* console.log(datosBusqueda) */

   filtrarAuto()
})

color.addEventListener('change', e => {
    datosBusqueda.color = e.target.value;

    filtrarAuto()
    
})






/* _____________________________________________________________________________________________________ */


/* funciones */

/* funcion que muestra todos los resultados que traemos del arreglo autos, muestra los autos */
const  mostrarAutos = ( autos ) =>{

    limpiarHtml();

    autos.forEach( auto => {

        const {marca,modelo, year, precio, puertas, color, transmision} = auto;
        const nombreAutoHtml = document.createElement('p');

        nombreAutoHtml.textContent = `
            marca:${marca}-año:${year} - modelo: ${modelo} - precio:${precio} - puertas:${puertas} - color: ${color} - transmision:${transmision} 
        `;

        /* insertar en el html */
        resultado.appendChild(nombreAutoHtml)
    })
}

/* limpiar el html manual */
const limpiarHtml = () => {
    while( resultado.firstChild){
        resultado.removeChild( resultado.firstChild);
    }
}








/* funcion que genera los años del select */
const llenarSelect = () => {
    for( let i = max; i >= min; i--){
        const opcion = document.createElement('option');
        opcion.value = i;
        opcion.textContent = i;
        year.appendChild( opcion ); /* agrega las opciones al select */
    }
}







/* funcion para filtrar los autos en base a la busqueda */

const filtrarAuto = () =>{
    
   const resultado = autos.filter( filtrarPorMarca ).filter( filtrarPorAño).filter( filtrarMinimo).filter(filtrarMaximo).filter(filtrarPuertas).filter(filtrarTransmision).filter(filtrarColor);

    console.log(resultado)
    

    if(resultado.length){
        mostrarAutos( resultado )
    }else{
        noResultado();
    }

}


const noResultado = () =>{

    limpiarHtml();

    const noResultado = document.createElement('div');
    noResultado.classList.add('no-resultado');
    noResultado.textContent = ' no hay resultados, intenta con otros terminos de busqueda'
    resultado.appendChild( noResultado);
}





const filtrarPorMarca = ( auto ) => {
    const { marca } = datosBusqueda;
    if( marca ){
        return auto.marca === marca;
    }
    return auto; 
}





/* funcion filtrar los autos por el año */
const filtrarPorAño = ( auto )=> {
    const { year } = datosBusqueda;
    if( year ){
        return auto.year === parseInt( year ) ;
    }
    return auto; 
}

/* funcion para filtar por precioMinimo */

const filtrarMinimo = ( auto) => {
    const{ minimo } = datosBusqueda;
    if( minimo ){
        return auto.precio >= minimo;
    }
    return auto;
}   



const filtrarMaximo = (auto)=>{
    const { maximo } = datosBusqueda;
    if( maximo ){
        return auto.precio <= maximo
    }
    return auto;
}


const filtrarPuertas = (auto) =>{
    const { puertas } = datosBusqueda;
    if( puertas ){
        return auto.puertas === puertas;
    }
    return auto;
}


const filtrarTransmision = (auto) =>{
    const{ transmision} = datosBusqueda;
    if( transmision){
        return auto.transmision === transmision;
    }
    return auto;
}


const filtrarColor = (auto) =>{
    const {color} = datosBusqueda;
    if( color ){
        return auto.color === color;
    }
    return auto;
}



/* sessionStorage.setItem('nombre', 'caradeculo') */

/* const datosStorage = localStorage.setItem('presupuesto', 'caradeculo')
console.log(datosStorage)
 */

localStorage.clear()

localStorage.setItem('midato', 'hola mundo')
















/* 1) iniciamos crando variables
    2) luego eventos
    3) luego funciones
    4) creamos la funcion que nos trae los datos o los autos en este caso, y que se muestren
    5) creamos la variable del año actual, y le restamos hasta el año que requerimos
    6) creamos la funcion que nos trae esos años iterandola con el for, y luego la insertamos en el select
    7) seguimos con la marca, primero generamos un objeto para llenarlos con cada select
    8) creamos las variables para cada uno de los campos select
    9)luego creamos los eventos para cada uno, en este caso el evento change de cambio, y le insertamos los valores seleccionados al objeto que creamos anteriormente y este se ira llenando
    10) creamos la funcion general para filtrar los autos
    11) luego la funcion para filtrar por marca
    12) luego creamos la funcion de filtrar por año, casi es la misma que la anterior
    12) limpiamos el html del filtrao para que solo aparezcan los seleccionados, debemos hacerlo manualmente con una funcion
 */



/* diferencia entre foreach y for
foreach() itera por lo general en los elementos de los arreglos de manera simple, se utiliza para traer los elementos de manera legible.

for() cuando se necesite un control de los indices o se necesite modificar un array, como eliminar,agregar etc.*/





