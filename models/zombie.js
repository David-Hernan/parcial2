const db = require('../util/database');

/*const muestras = [
    {nombre: "vicodin", funcion: "La medicina del doctor House"},
    {nombre: "Vitacilina", funcion: "¡Ah qué buena medicina!"},
    {nombre: "Imodium", funcion: "Opioide contra la diarrea"}
];*/

//El modelo es una clase
module.exports = class Zombie {

    //Constructor de la clase. Sirve para crear un nuevo objeto, y en él se definen las propiedades del modelo
    constructor(nombre, statusz) {
        this.nombre = nombre;
        this.statusz = statusz;
    }

    save(namez, staz) {
        return db.execute('INSERT INTO sube(id_zombie, id_status) VALUES((SELECT id_zombie FROM zombie  WHERE nombre= ? ),(SELECT id_status FROM estado WHERE statusz= ? ))',
            [namez, staz]
        );
    }

    save_new(namez, staz) {
        let temp = db.execute('INSERT INTO zombie(nombre) VALUES (?)',
            [namez]
        );
        this.save(namez,staz);
        return temp;
    }

    static nombres_estados(){
        return db.execute('SELECT nombre, statusz, fecha FROM zombie, estado, sube WHERE zombie.id_zombie = sube.id_zombie AND sube.id_status = estado.id_status')
    }

    static find(query){
        return db.execute('SELECT nombre, statusz, fecha FROM zombie, estado, sube WHERE zombie.id_zombie = sube.id_zombie AND sube.id_status = estado.id_status AND statusz LIKE ?',
        ['%'+query+'%']);
    }

    static cuenta_zombies(){
        return db.execute("SELECT COUNT(nombre) 'Total de zombies' FROM zombie");
    }

    static cuenta_estados(query){
        return db.execute('SELECT COUNT(fecha) FROM zombie, estado, sube WHERE zombie.id_zombie = sube.id_zombie AND sube.id_status = estado.id_status AND statusz LIKE ?',
        ['%'+query+'%']);
    }
    
}