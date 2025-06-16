const { Router } = require('express');
const Usuario = require('../models/Usuario');
const { validationResult, check } = require('express-validator');
const bcrypt = require('bcryptjs');
const { validateJWT } = require('../middleware/validate-jwt');
const {validateRoleAdmin } = require('../middleware/validate-role-admin');

const router = Router();


router.post('/', [validateJWT, validateRoleAdmin], [
    check('name', 'invalid.name').not().isEmpty(),
    check('email', 'invalid.email').isEmail(),
    check('password', 'invalid.password').not().isEmpty(),
    check('role', 'invalid.role').isIn(['Administrador', 'Docente']),
    check('state', 'invalid.state').isIn(['Activo', 'Inactivo']),
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array() });
        }

        
        const existeUsuario = await Usuario.findOne({ email: req.body.email });
        if (existeUsuario) {
            return res.status(400).json({ message: 'El correo ya está registrado' });
        }

        
        let usuario = new Usuario();
        usuario.name = req.body.name;
        usuario.email = req.body.email;

        const salt = bcrypt.genSaltSync();
        const password = bcrypt.hashSync(req.body.password, salt);        
        usuario.password = password;
        
        usuario.role = req.body.role;
        usuario.state = req.body.state;
        usuario.createdAt = new Date();
        usuario.updatedAt = new Date();

        usuario = await usuario.save();
        res.status(201).send(usuario);

    } catch (error) {
        console.error(error);
        res.status(500).send('message error');
    }
});


router.get('/', [validateJWT, validateRoleAdmin], async (req, res) => {
    try {
        const usuarios = await Usuario.find();
        res.send(usuarios);
    } catch (error) {
        console.error(error);
        res.status(500).send('message error');
    }
});


router.put('/:usuarioId', [validateJWT, validateRoleAdmin], [
    check('name', 'invalid.name').not().isEmpty(),
    check('role', 'invalid.role').isIn(['Administrador', 'Docente']),
    check('state', 'invalid.state').isIn(['Activo', 'Inactivo']),
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array() });
        }

        let usuario = await Usuario.findById(req.params.usuarioId);
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        usuario.name = req.body.name;
        usuario.role = req.body.role;
        usuario.state = req.body.state;
        usuario.updatedAt = new Date();

        usuario = await usuario.save();
        res.send(usuario);

    } catch (error) {
        console.error(error);
        res.status(500).send('message error');
    }
});

module.exports = router;
