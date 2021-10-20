const express = require('express');

//Middleware para login
const isAuth = require('../util/is-auth');

const router = express.Router();

//Establezco la ruta
const zombiesController = require('../controllers/zombies_controller');

/*//ruta para consultar
router.get('/list/:muestras_nombre', muestrasController.getList);*/

//ruta y acción del controller que está mandando a llamar
router.get('/list', zombiesController.getList);

/*//-------------------------------------------------------------------
//ruta para editar elementos
router.get('/edit/:muestras_index', muestrasController.getModif);

router.post('/edit/:muestras_index', muestrasController.postModif);
//-------------------------------------------------------------------*/

router.get('/add', zombiesController.getAdd);

router.post('/add', zombiesController.postAdd);

router.get('/add_new_z', zombiesController.getAddNZ);

router.post('/add_new_z', zombiesController.postAddNZ);

router.post('/search', zombiesController.postSearch);
 
module.exports = router;  