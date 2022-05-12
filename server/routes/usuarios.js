
const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');

const { obtenerUsuarios, 
        obtenerUsuario,
        crearUsuario, 
        actualizarUsuario, 
        eliminarUsuario
      } = require('../controllers/usuarios');

const { emailExiste,
        existeUsuarioPorId } = require('../helpers/db-validatos');


const router = Router();

// Listar usuarios
router.get('/',obtenerUsuarios);

//Actualizar usuario
router.put('/:id',[
        check('id', 'No es un id valido').isMongoId(),
        check('id').custom(existeUsuarioPorId),
        validarCampos
],actualizarUsuario);

// Obtener una usuario por id
router.get('/:id',[
        check('id', 'No es un id valido').isMongoId(),
        check('id').custom( existeUsuarioPorId ),
        validarCampos
      ],obtenerUsuario)

//Crear usuario
router.post('/', [
        check('nombre','El nombre es obligatorio').not().isEmpty(),
        check('correo','El correo no es valido').isEmail(),
        check('correo').custom(emailExiste),
        validarCampos
],crearUsuario);

router.delete('/:id',[
        check('id', 'No es un id valido').isMongoId(),
        check('id').custom(existeUsuarioPorId),
        validarCampos
],eliminarUsuario);



module.exports = router;