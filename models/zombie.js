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
        return db.execute("SELECT COUNT(nombre) 'total' FROM zombie");
    }

    static cuenta_estados(query){
        return db.execute('SELECT COUNT(fecha)"group_total" FROM zombie, estado, sube WHERE zombie.id_zombie = sube.id_zombie AND sube.id_status = estado.id_status AND statusz LIKE ?',
        ['%'+query+'%']);
    }

    //----------------------
    static e1(){
        return db.execute("SELECT COUNT(fecha)'g1' FROM zombie, estado, sube WHERE zombie.id_zombie = sube.id_zombie AND sube.id_status = estado.id_status AND statusz = 'infección'");
    }
    static e2(){
        return db.execute("SELECT COUNT(fecha)'g2' FROM zombie, estado, sube WHERE zombie.id_zombie = sube.id_zombie AND sube.id_status = estado.id_status AND statusz = 'desorientación'");
    }
    static e3(){
        return db.execute("SELECT COUNT(fecha)'g3' FROM zombie, estado, sube WHERE zombie.id_zombie = sube.id_zombie AND sube.id_status = estado.id_status AND statusz = 'violencia'");
    }
    static e4(){
        return db.execute("SELECT COUNT(fecha)'g4' FROM zombie, estado, sube WHERE zombie.id_zombie = sube.id_zombie AND sube.id_status = estado.id_status AND statusz = 'desmayo'");
    }
    static e5(){
        return db.execute("SELECT COUNT(fecha)'g5' FROM zombie, estado, sube WHERE zombie.id_zombie = sube.id_zombie AND sube.id_status = estado.id_status AND statusz = 'transformación'");
    }
    
}