const { Router } = require('express');
const { check } = require('express-validator');
const {
  usuariosGet,
  usuariosPost,
  usuariosPut,
  usuariosPatch,
  usuariosDelete,
} = require('../controllers/usuarios');
const {
  esRoleValido,
  emailExisteBD,
  existeUsuarioPorId,
} = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.get('/', usuariosGet);
router.put(
  '/:id',
  [
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('rol').custom(esRoleValido),
  ],
  validarCampos,
  usuariosPut
);
router.post(
  '/',
  [
    check('email', 'El email no es válido').isEmail(),
    check('password', 'El password debe tener al menos 6 caracteres').isLength({
      min: 6,
    }),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    // check('role', 'El role no es válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom(esRoleValido),
    check('email').custom(emailExisteBD),
    validarCampos,
  ],
  usuariosPost
);
router.patch('/', usuariosPatch);
router.delete(
  '/:id',
  [
    (check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos),
  ],
  usuariosDelete
);

module.exports = router;
