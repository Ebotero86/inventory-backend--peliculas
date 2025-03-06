const { Router } = require('express');
const Tipo = require('../models/Tipo'); 
const { validationResult, check } = require('express-validator');

const router = Router();

router.post('/', [
    check('name', 'invalid.name').not().isEmpty(),
    check('description', 'invalid.description').not().isEmpty(),
], async function(req, res) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array() });
        }

        let tipo = new Tipo();
        tipo.name = req.body.name;
        tipo.description = req.body.description;
        tipo.createdAt = new Date();
        tipo.updatedAt = new Date();

        tipo = await tipo.save();
        res.send(tipo);

    } catch (error) {
        console.log(error);
        res.status(500).send('message error');
    }
});

router.get('/', async function(req, res) {
    try {
        const tipos = await Tipo.find();
        res.send(tipos);

    } catch (error) {
        console.log(error);
        res.status(500).send('message error');
    }
});

router.put('/:tipoId', [
    check('name', 'invalid.name').not().isEmpty(),
    check('description', 'invalid.description').not().isEmpty(),
], async function(req, res) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array() }); 
        }

        let tipoEncontrado = await Tipo.findById(req.params.tipoId);
        
        if (!tipoEncontrado) {
            return res.status(400).send({ message: 'tipo not found' });
        }
        
        tipoEncontrado.name = req.body.name;      
        tipoEncontrado.description = req.body.description;        
        tipoEncontrado.updatedAt = new Date();
        
        tipoEncontrado = await tipoEncontrado.save();
        res.send(tipoEncontrado);

    } catch (error) {
        console.log(error);
        res.status(500).send('message error');
    }
});

module.exports = router;
