const express = require('express');

const isAuth = require('../util/is-auth');

const router = express.Router();

//Establezco la ruta
const usersController = require('../controllers/users_controller');

router.get('', usersController.getLogin);

router.post('', usersController.postLogin);

router.get('/logout', isAuth, usersController.getLogout); 

//Agregar usuario
router.get('/adduser', isAuth, usersController.getAdduser);

router.post('/adduser', isAuth, usersController.postAdduser); 

module.exports = router; 