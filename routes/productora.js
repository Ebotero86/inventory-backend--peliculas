const { Router } = require('express');
const Productora = require('../models/Productora'); 
const { validationResult, check } = require('express-validator');

const router = Router();


router.post('/', [
    check('name', 'invalid.name').not().isEmpty(),
    check('state', 'invalid.state').isIn([ 'Activo', 'Inactivo' ]),
    check('description', 'invalid.description').not().isEmpty(),
    check('slogan', 'invalid.slogan').not().isEmpty(),
], async function(req, res) {
    
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array() });
        }

        let productora = new Productora();
        productora.name = req.body.name;
        productora.state = req.body.state;
        productora.createdAt = new Date();
        productora.updatedAt = new Date();
        productora.slogan = req.body.slogan || ''; 
        productora.description = req.body.description;

        productora = await productora.save();
        res.send(productora);

    } catch (error) {
        console.log(error);
        res.status(500).send('message error');
    }

});


router.get('/', async function(req, res) {
    try {
        const productora = await Productora.find();
        res.send(productora);

    } catch (error) {
        console.log(error);
        res.status(500).send('message error');
    }
});

router.put('/:productoraId', [
    check('name', 'invalid.name').not().isEmpty(),
    check('state', 'invalid.state').isIn([ 'Activo', 'Inactivo' ]),
    check('description', 'invalid.description').not().isEmpty(),
    check('slogan', 'invalid.slogan').not().isEmpty(),

], async function(req, res) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array() }); 
        }

    
        let productora = await Productora.findById(req.params.productoraId);
        
        if (!productora) {
            return res.status(400).send({ message: 'Productora not found' });
        }
        
        productora.name = req.body.name;
        productora.state = req.body.state;        
        productora.description = req.body.description;
        productora.slogan = req.body.slogan || ''; 
        productora.updatedAt = new Date();
        
        productora = await productora.save();
        res.send(productora);

    } catch (error) {
        console.log(error);
        res.status(500).send('message error');
    }
});

module.exports = router;
