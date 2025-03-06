const { Router } = require('express');
const Media = require('../models/Media'); 
const { validationResult, check } = require('express-validator');

const router = Router();

router.get('/', async function(req, res) {
    try {
        const media = await Media.find(); 
        res.send(media);

    } catch (error) {
        console.log(error);
        res.status(500).send('message error')
    }
});

router.post('/', [
    check('serial', 'El campo serial es obligatorio y único').not().isEmpty(),
    check('titulo', 'El campo titulo es obligatorio').not().isEmpty(),
    check('sinopsis', 'El campo sinopsis es obligatorio').not().isEmpty(),
    check('url', 'El campo url es obligatorio y único').not().isEmpty(),
    check('imagen', 'El campo imagen es obligatorio').not().isEmpty(),
    check('anoEstreno', 'El campo año de estreno es obligatorio').isNumeric(),
    check('generoPrincipal', 'El campo media principal es obligatorio').not().isEmpty(),
    check('directorPrincipal', 'El campo director principal es obligatorio').not().isEmpty(),
    check('productora', 'El campo productora es obligatorio').not().isEmpty(),
    check('tipo', 'El campo tipo es obligatorio').not().isEmpty()
], async function(req, res) {

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array() });
        }

        let media = new Media();
        media.serial = req.body.serial;
        media.titulo = req.body.titulo;
        media.sinopsis = req.body.sinopsis;
        media.url = req.body.url;
        media.imagen = req.body.imagen;        
        media.anoEstreno = req.body.anoEstreno;
        media.generoPrincipal = req.body.generoPrincipal;
        media.directorPrincipal = req.body.directorPrincipal;
        media.productora = req.body.productora;
        media.tipo = req.body.tipo;
        media.createdAt = new Date();
        media.updatedAt = new Date();

        media = await media.save();
        res.status(201).json(media);  

    } catch (error) {
        console.log(error);
        res.status(500).send('Error al crear el recurso');
    }
});

router.get('/', async function(req, res) {
    try {
        const media = await Media.find().populate([
            {
                path: 'director', select: 'name, state'
            },
            {
                path: 'genero', select: 'name, state, description'
            },
            {
                path: 'productora', select: 'name, state, slogan, description'
            },
            {
                path: 'tipo', select: 'name, description'
            },

        ]); 
        res.send(media);

    } catch (error) {
        console.log(error);
        res.status(500).send('message error')
    }
});

router.put('/:mediaId', [
    check('serial', 'El campo serial es obligatorio y único').not().isEmpty(),
    check('titulo', 'El campo titulo es obligatorio').not().isEmpty(),
    check('sinopsis', 'El campo sinopsis es obligatorio').not().isEmpty(),
    check('url', 'El campo url es obligatorio y único').not().isEmpty(),
    check('imagen', 'El campo imagen es obligatorio').not().isEmpty(),
    check('anoEstreno', 'El campo año de estreno es obligatorio').isNumeric(),
    check('generoPrincipal', 'El campo media principal es obligatorio').not().isEmpty(),
    check('directorPrincipal', 'El campo director principal es obligatorio').not().isEmpty(),
    check('productora', 'El campo productora es obligatorio').not().isEmpty(),
    check('tipo', 'El campo tipo es obligatorio').not().isEmpty()
], async function(req, res) {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ message: errors.array() }); 
        }

    
        let media = await Media.findById(req.params.mediaId);
        
        if (!media) {
            return res.status(400).send({ message: 'media not found' });
        }
        
        media.serial = req.body.serial;
        media.titulo = req.body.titulo;
        media.sinopsis = req.body.sinopsis;
        media.url = req.body.url;
        media.imagen = req.body.imagen;        
        media.anoEstreno = req.body.anoEstreno;
        media.generoPrincipal = req.body.generoPrincipal;
        media.directorPrincipal = req.body.directorPrincipal;
        media.productora = req.body.productora;
        media.tipo = req.body.tipo;               
        media.updatedAt = new Date();
        
        media = await media.save();
        res.send(media);

    } catch (error) {
        console.log(error);
        res.status(500).send('message error');
    }
});

module.exports = router;
