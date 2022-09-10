const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuarios');

const validarJWT = async (req = request, res = response, next) => {
  const token = req.header('x-token');

  if (!token) {
    res.status(401).json({
      msg: 'No existe jWT',
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

    // leer el usuario que corresponde al uid
    const usuario = await Usuario.findById(uid);

    req.usuario = usuario;
    next();
  } catch (error) {
    res.status(401).json({
      msg: 'Token no válido',
    });
  }

  next();
};

module.exports = {
  validarJWT,
};
