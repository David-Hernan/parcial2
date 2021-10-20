const db = require('../util/database');
const bcrypt = require('bcryptjs');

module.exports = class Usuario {

    constructor(nombre_completo, username, password) {
        this.nombre_completo = nombre_completo;
        this.username = username;
        this.password = password;
    }

    save() {
        //El 12 es número de veces que se ejecuta el algoritmo
        return db.execute('INSERT INTO usuarios (nombre_completo, username, password) VALUES (?, ?, ?)',
            [this.nombre_completo, this.username, bcrypt.hashSync(this.password, 12)]
        );
    }

    static fetchOne(username) {
        return db.execute('SELECT * FROM usuarios WHERE username = ?'
        ,[username]);
    }
}