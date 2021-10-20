//Meter el modelo de platillos que contiene el arreglo
const Zombie = require('../models/zombie');
const db = require('../util/database');
//cuenta_estados(query)
exports.getList = (request, response, next) => {
    Zombie.cuenta_zombies()
            .then(([cuenta, fieldData]) => {
                Zombie.nombres_estados()
                .then(([rows, fieldData]) => {
                    console.log(rows);
                    response.render('lista_zombies', { 
                        titulo: "Lista de zombies",
                        cantidad: cuenta[0],
                        isLoggedIn: request.session.isLoggedIn,
                        username: request.session.username,
                        lista_muestras: rows,
                    });
                })
                .catch(err => {
                    console.log(err);
                    response.status(302).redirect('/error');
                });
            })
};

exports.getAdd = (request, response, next) => {
    response.render('add_estado', {
        titulo: "Agregar Estado de Zombificación", 
        isLoggedIn: request.session.isLoggedIn,
        username: request.session.username,
    });
}; 

exports.postAdd = (request, response, next) => {
    const zomb = new Zombie(request.body.nombre, request.body.estaz);
    zomb.save(request.body.nombre, request.body.estaz) 
        .then(() => {
            response.status(302).redirect('/zombies/list');
        }).catch(err => {
            console.log(err);
            response.status(302).redirect('/error');
        });
};  

exports.getAddNZ = (request, response, next) => {
    response.render('add_zombie', {
        titulo: "Agregar Nuevo Zombie", 
        isLoggedIn: request.session.isLoggedIn,
        username: request.session.username,
    });
}; 

exports.postAddNZ = (request, response, next) => {
    const zomb = new Zombie(request.body.nombre, request.body.estaz);
    zomb.save_new(request.body.nombre, request.body.estaz) 
        .then(() => {
            response.status(302).redirect('/zombies/list');
        }).catch(err => {
            console.log(err);
            response.status(302).redirect('/error');
        });
}; 

exports.postSearch = (request, response, next) => {
    console.log(request.body.query);
    Zombie.find(request.body.query)
    .then( ([rows, fieldData]) => {
        response.status(200).json({rows});
    }).catch(err => {
        console.log(err);
        response.status(200).json({error: err});
    });
}; 



