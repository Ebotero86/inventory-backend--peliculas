const { Router } = require('express');
const Genero = require('../models/Genero');
const { validationResult, check } = require('express-validator');


const router = Router();

router.post('/', [
    check('name', 'invalid.name').not().isEmpty(),
    check('state', 'invalid.state').isIn([ 'Activo', 'Inactivo' ]),
], async function(req, res) {
    
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array() }); 
        }

        let genero = new Genero();
        genero.name = req.body.name;
        genero.state = req.body.state;
        genero.createdAt = new Date();
        genero.updatedAt = new Date();

        genero = await genero.save();
        res.send(genero)

    } catch (error){
        console.log(error);
        res.status(500).send('message error')
    }

});

router.get('/', async function(req, res) {
    try {
        const genero = await Genero.find(); 
        res.send(genero);

    } catch (error) {
        console.log(error);
        res.status(500).send('message error')
    }
});

router.put('/:generoId', [
    check('name', 'invalid.name').not().isEmpty(),
    check('state', 'invalid.state').isIn([ 'Activo', 'Inactivo' ]),
], async function(req, res) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array() }); 
        }

    
        let genero = await Genero.findById(req.params.generoId);
        
        if (!genero) {
            return res.status(400).send({ message: 'Genero not found' });
        }
        
        genero.name = req.body.name;
        genero.state = req.body.state;
        genero.updatedAt = new Date();
        
        genero = await genero.save();
        res.send(genero);

    } catch (error) {
        console.log(error);
        res.status(500).send('message error');
    }
});

module.exports = router;
