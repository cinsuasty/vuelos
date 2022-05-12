const { Router } = require('express');
const { check } = require('express-validator');

const { obtenerAeropuertos , 
        crearAeropuerto, 
        obtenerAeropuerto, 
        actualizarAeropuerto, 
        borrarAeropuerto
      } = require('../controllers/aeropuertos');

const { existeAeropuertoPorId } = require('../helpers/db-validatos');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();


// Obtener las aeropuertos
router.get('/',
  obtenerAeropuertos
)

// Obtener una Aeropuerto por id
router.get('/:id',[
  check('id', 'No es un id valido').isMongoId(),
  check('id').custom( existeAeropuertoPorId ),
  validarCampos
],obtenerAeropuerto)

//Crear Aeropuerto
router.post('/',[
    validarCampos
],crearAeropuerto)

// Actualizar Aeropuerto por id

router.put('/:id',[
  check('id', 'No es un id valido').isMongoId(),
  check('nombre','El nombre de la Aeropuerto es obligatorio').not().isEmpty(),
  check('id').custom( existeAeropuertoPorId ),
  validarCampos
],actualizarAeropuerto)


// Borrar Aeropuerto por id
router.delete('/:id',[
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom( existeAeropuertoPorId ),
    validarCampos
],borrarAeropuerto)


module.exports = router;
