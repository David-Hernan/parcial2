//Meter el modelo de platillos que contiene el arreglo
const Muestra = require('../models/muestra');
const db = require('../util/database');

//Mandar la lógica al controller
exports.getList = (request, response, next) => {
    console.log(request.cookies.ultima_muestra);

    Muestra.fetchAll(request.params.muestras_nombre)
        .then(([rows, fieldData]) => {
            console.log(rows);
            //Mober el response.render para acá
            response.render('lista_muestras', {
                titulo: "Muestras",
                isLoggedIn: request.session.isLoggedIn,
                username: request.session.username,
                lista_muestras: rows,
            });
        })
        .catch(err => {
            console.log(err);
            response.status(302).redirect('/error');
        });
};

exports.getAdd = (request, response, next) => {
    //Evita acccesos no autorizados, pero es más práctico el middleware
    /*if (!request.session.isLoggedIn) {
        return response.redirect('/login');
    }*/
    response.render('add_muestras', {
        titulo: "Agregar Muestra a la lista",
        isLoggedIn: request.session.isLoggedIn,
        username: request.session.username,
    });
};

exports.postAdd = (request, response, next) => {
    //En header va cookie             nombre_cookie     valor_cookie
    response.setHeader('Set-Cookie', 'ultima_muestra='+'Nombre: '+request.body.nombre+' Descripcion: '+request.body.funcion + ';HttpOnly');

    const muestra = new Muestra(request.body.nombre, request.body.funcion, request.body.indice_bodega);
    //el then y catch es para que la página de lista se actualice justo después de agregar lo nuevo
    muestra.save()
        .then(() => {
            response.status(302).redirect('/muestras/list');
        }).catch(err => {
            console.log(err);
            response.status(302).redirect('/error');
        });
};  

//Moificar dato
exports.getModif = (request, response, next) => {
    //console.log(request.cookies.ultima_muestra);
    Muestra.fetchOne(request.params.muestras_index)
        .then(([rows, fieldData]) => {
            //console.log(rows);
            response.render('edit_muestra', {  
                titulo: "Modificar Muestra",
                isLoggedIn: request.session.isLoggedIn,
                username: request.session.username,
                lista_muestras: rows[0],
            });
        })
        .catch(err => {
            console.log(err);
            response.status(302).redirect('/error');
        });
};

exports.postModif = (request, response, next) => {
    Muestra.update(request.body.nombre, request.body.funcion, request.body.indice_bodega, request.params.muestras_index)
        .then(() => {
            console.log("Updated lista");
            response.status(302).redirect('/muestras/list');
        }).catch(err => {
            console.log(err);
            response.status(302).redirect('/error');
        });
};

exports.postSearch = (request, response, next) => {
    console.log(request.body.query);
    Muestra.find(request.body.query)
    .then( ([rows, fieldData]) => {
        response.status(200).json({rows});
    }).catch(err => {
        console.log(err);
        response.status(200).json({error: err});
    });
}; 

