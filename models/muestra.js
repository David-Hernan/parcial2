const db = require('../util/database');

/*const muestras = [
    {nombre: "vicodin", funcion: "La medicina del doctor House"},
    {nombre: "Vitacilina", funcion: "¡Ah qué buena medicina!"},
    {nombre: "Imodium", funcion: "Opioide contra la diarrea"}
];*/

var indice;

//El modelo es una clase
module.exports = class Muestra {

    //Constructor de la clase. Sirve para crear un nuevo objeto, y en él se definen las propiedades del modelo
    constructor(mi_nombre, mi_funcion, miindice_bodega) {
        this.nombre = mi_nombre;
        this.funcion = mi_funcion;
        this.indice_bodega = miindice_bodega;
    }

    //Este método servirá para guardar de manera persistente el nuevo objeto. 
    save() {
        //los signos de interrogación y el arreglo te cuida de SQL injection
        return db.execute('INSERT INTO muestras (nombre, funcion, indice_bodega) VALUES (?, ?, ?)',
            [this.nombre, this.funcion, this.indice_bodega]
        );
    }

    //Este método servirá para devolver los objetos del almacenamiento persistente.
    //Los métodos estáticos se ejecutan sobre la clase,
    //no necesariamente sobre un objeto de la clase
    static fetchAll(id) {
        if (id === undefined){
            return db.execute('SELECT * FROM muestras');
        }else{
            return db.execute('SELECT * FROM muestras WHERE nombre = ?', [id]);
        }
    }

    static update(nombre, funcion, indice_bodega, id) {
        return db.execute('UPDATE muestras SET nombre=? , funcion=?, indice_bodega=? WHERE indice_medicinas= ?',
        [nombre, funcion, indice_bodega, id]
        );
    }

    static fetchOne(id){
        return db.execute('SELECT * FROM muestras WHERE indice_medicinas = ?', [id]);
    }

    static find(query){
        return db.execute('SELECT * From muestras WHERE nombre LIKE ? OR funcion LIKE ? OR indice_bodega LIKE ?',
        ['%'+query+'%', '%'+query+'%', '%'+query+'%']);
    }
}