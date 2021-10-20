const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');

exports.getLogin = (request, response, next) => {
    response.render('login', {
        //csrfToken: request.csrfToken(),
        titulo: "Iniciar sesión",
        isLoggedIn: request.session.isLoggedIn ||false,
        username: request.session.username,
    });
};

exports.postLogin = (request, response, next) => {
    Usuario.fetchOne(request.body.username).then(([rows, fieldData]) => {
            console.log(rows);
            //Para comparar si password ingresada es correcta
            bcrypt.compare(request.body.password, rows[0].password)
            .then(doMatch => {
                //compare regresa doMatch variable =true si coinciden
                if (doMatch) {
                    request.session.isLoggedIn = true;
                    request.session.username = request.body.username;
                    return request.session.save(err => {
                    response.status(302).redirect('/');
                    });
                }
                console.log("Usuario y contraseña no coinciden")
                response.status(302).redirect('/login');
            }).catch(err => {
                //Error en el compare
                console.log("Ocurrió un error en comparación de passwords")
                response.status(302).redirect('/login');
            });
        })
        .catch(err => {
            console.log(err);
            console.log("No se encotnró el usuario");
            response.status(302).redirect('/login');
        });
};

exports.getLogout = (request, response, next) => {
    request.session.destroy(() => {
        response.redirect('/login')
    });
};

//Agregar nuevo usuario
exports.getAdduser = (request, response, next) => {
    response.render('add_user', {
        titulo: "Registrar un nuevo usuario",
        isLoggedIn: request.session.isLoggedIn,
        username: request.session.username,
    });
};

exports.postAdduser = (request, response, next) => {
    const usuario = new Usuario(request.body.nombre_completo, request.body.username, request.body.password);
    //el then y catch es para que la página de lista se actualice justo después de agregar lo nuevo
    usuario.save()
        .then(() => {
            response.status(302).redirect('/login');
        }).catch(err => {
            console.log(err);
            response.status(302).redirect('/error');
        });
};




