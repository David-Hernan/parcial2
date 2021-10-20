const express = require('express');

const router = express.Router();

//Establezco la ruta
const menuController = require('../controllers/menu_controller');

//ruta y acción del controller que está mandando a llamar
router.get('', menuController.getMenu);

module.exports = router; 