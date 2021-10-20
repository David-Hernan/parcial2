const express = require('express');
const app = express(); 

const bodyParser = require('body-parser');
//Agregar el cookieParser
const cookieParser = require('cookie-parser');
//Agrega express-session para manejo de variables de sesión con express
const session = require('express-session');

//csrf para proteger de usuarios de poca confianza
const csrf = require('csurf');
const csrfProtection = csrf(); 

const menu = require('./routes/menu');
/*const muestras = require('./routes/muestras');*/
const rutasUsers = require('./routes/login');
//----------------------------------------------------------------------------
const zombies = require('./routes/zombies');
//----------------------------------------------------------------------------

//Devolver como respuesta un HTML, es un módulo
const path = require('path');

//Middleware
app.set('view engine', 'ejs');
app.set('views', 'views');

//Configura como carpeta estática la carpeta llamada "public"
//Para incluir los css y javascripts
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({extended: false}));
//Para usar JSON
app.use(bodyParser.json());
//Agregar el cookieParser
app.use(cookieParser());
//Agregar el express-session
app.use(session({
    //String secreto es aleatorio y no muy largo, valor que usa sesión para que otros no puedan romperla, tipo password interno
    secret: 'vjabfiubaviabviubfviub84y38r7y18rbfqfu87fb82fub193487fb28fb8rubf', 
    //Guarda a cada ratos los valores de sesión. En falso los cambia sólo cuando algo cambia
    resave: false, //La sesión no se guardará en cada petición, sino sólo se guardará si algo cambió 
    //En falso asegura que no se guarda petición cuando no se necesita
    saveUninitialized: false, //Asegura que no se guarde una sesión para una petición que no lo necesita
}));

//Para csrf, usar el middleware csrfProtection
//...Y después del código para inicializar la sesión... 
app.use(csrfProtection);
//Objeto response tiene atributo llamado locals donde se puede poner el token
//incluye variable csrfToken en todas las respuestas
app.use((request, response, next) => {
    response.locals.csrfToken = request.csrfToken();
    next(); 
});

//Ruta de login
app.use('/login', rutasUsers)

app.use('/zombies', zombies)

//Página de inicio (Menú principal)
app.use('', menu)

//Página no encontrada
app.use('/error', (request, response, next) => {
    response.status(500); 
    let noen = '<head><meta charset="UTF-8"></head>';
    noen += '<h1>Internal Server Error</h1>';
    noen += '<img src="https://www.gsoft.es/wp-content/uploads/2020/02/blog-gsoft-500-968x423.jpg">';
    response.send(noen);
});

//Página no encontrada
app.use((request, response, next) => {
    response.status(404); 
    let noen = '<head><meta charset="UTF-8"></head>';
    noen += '<h1>Esta página no existe...</h1>';
    noen += '<img src="https://i1.wp.com/media.giphy.com/media/8L0Pky6C83SzkzU55a/source.gif?w=525&ssl=1">';
    response.send(noen);
});

app.listen(3000);