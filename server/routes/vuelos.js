const { Router } = require('express');
const { check } = require('express-validator');

const { obtenerVuelos, crearVuelo } = require('../controllers/vuelos');
const { emailExiste, vueloExiste, existeUsuarioPorId, existeAeropuertoPorId, existeAerolineaPorId } = require('../helpers/db-validatos');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();


// Obtener los productos - publico middleware para validar id categoria
router.get('/',
    obtenerVuelos
    )

//Crear vuelo
router.post('/', [
    check('vuelo','El vuelo es obligatorio').not().isEmpty(),
    check('vuelo').custom(vueloExiste),
    check('fecha','La fecha es obligatoria').not().isEmpty(),
    check('fecha','La fecha debe estar en formato fecha').isDate(),
    check('usuario','El usuario es obligatorio').not().isEmpty(),
    check('usuario', 'No es un id valido').isMongoId(),
    check('usuario').custom(existeUsuarioPorId),
    check('origen','El origen es obligatorio').not().isEmpty(),
    check('origen', 'No es un id valido').isMongoId(),
    check('origen').custom(existeAeropuertoPorId),
    check('destino','El destino es obligatorio').not().isEmpty(),
    check('destino', 'No es un id valido').isMongoId(),
    check('destino').custom(existeAeropuertoPorId),
    check('aerolinea','La aerolinea es obligatoria').not().isEmpty(),
    check('aerolinea', 'No es un id valido').isMongoId(),
    check('aerolinea').custom(existeAerolineaPorId),
    check('asiento','El asiento es obligatorio').not().isEmpty(),
    validarCampos
],crearVuelo);

module.exports = router;
