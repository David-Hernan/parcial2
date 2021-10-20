const session = require("express-session");

exports.getMenu = (request, response, next) => {
    response.render('menu', {
        isLoggedIn: request.session.isLoggedIn,
        username: request.session.username,
    }); 
};