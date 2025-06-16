const { Router } = require('express');
const Usuario = require('../models/Usuario');
const { validationResult, check } = require('express-validator');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helper/jwt');

const router = Router();

router.post('/', [    
    check('email', 'invalid.email').isEmail(), 
    check('password', 'invalid.password').not().isEmpty(),   
], async function (req, res) {

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array() }); 
        }

        const usuario = await Usuario.findOne({ email: req.body.email });
        if (!usuario) {
            return res.status(400).json({ message: 'usuario no encontrado' });
        }

        const isEquals = bcrypt.compareSync(req.body.password, usuario.password);
        if (!isEquals) {
            return res.status(400).json({ message: 'usuario no encontrado' });
        }

        const token = generarJWT(usuario);

        res.json({
            _id: usuario._id, name: usuario.name,
            role: usuario.role, email: usuario.email, access_token: token
        });

    } catch (error) {
        console.log(error);
        res.status(500).send('message error');
    }
});

module.exports = router;
