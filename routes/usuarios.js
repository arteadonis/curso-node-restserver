const { Router } = require('express');
const { check } = require('express-validator');

const {
  esRoleValido,
  emailExisteBD,
  existeUsuarioPorId,
} = require('../helpers/db-validators');
const {
  validarCampos,
  validarJWT,
  esAdminRole,
  tieneRole,
} = require('../middlewares');

const {
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosPatch,
  usuariosDelete,
} = require('../controllers/usuarios');

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

router.delete(
  '/:id',
  [
    validarJWT,
    // esAdminRole,
    tieneRole('ADMIN_ROLE', 'VENTAR_ROLE', 'OTRO_ROLE'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos,
  ],
  usuariosDelete
);

router.patch('/', usuariosPatch);

module.exports = router;
