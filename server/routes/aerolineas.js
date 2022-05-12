const { Router } = require('express');
const { check } = require('express-validator');

const { obtenerAerolineas , 
        crearAerolinea, 
        obtenerAerolinea, 
        actualizarAerolinea, 
        borrarAerolinea
      } = require('../controllers/aerolineas');

const { existeAerolineaPorId } = require('../helpers/db-validatos');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();


// Obtener las aerolineas
router.get('/',
  obtenerAerolineas
)

// Obtener una aerolinea por id
router.get('/:id',[
  check('id', 'No es un id valido').isMongoId(),
  check('id').custom( existeAerolineaPorId ),
  validarCampos
],obtenerAerolinea)

//Crear aerolinea
router.post('/',[
    validarCampos
],crearAerolinea)

// Actualizar aerolinea por id

router.put('/:id',[
  check('id', 'No es un id valido').isMongoId(),
  check('nombre','El nombre de la aerolinea es obligatorio').not().isEmpty(),
  check('id').custom( existeAerolineaPorId ),
  validarCampos
],actualizarAerolinea)


// Borrar aerolinea por id
router.delete('/:id',[
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom( existeAerolineaPorId ),
    validarCampos
],borrarAerolinea)


module.exports = router;
