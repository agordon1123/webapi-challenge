const express = require('express');
const db = require('../../data/helpers/projectModel');
const actionRouter = require('./actionRouter');

const projectRouter = express.Router();
projectRouter.use('/:id/actions', actionRouter);

// CREATE
projectRouter.post('/', validateProjectBody, (req, res) => {    
    db.insert(req.body)
        .then(suc => {
            res.status(201).json(suc);
        })
        .catch(() => {
            res.status(500).json({ error: 'Internal server error' });
        })
});

// READ
projectRouter.get('/', (req, res) => {
    db.get()
        .then(projects => {
            res.status(200).json(projects);
        })
        .catch(() => {
            res.status(500).json({ error: 'Internal server error' });
        })
});

projectRouter.get('/:id', (req, res) => {
    const { id } = req.params;
    db.get(id)
        .then(project => {
            res.status(200).json(project);
        })
        .catch(() => {
            res.status(500).json({ error: 'Internal server error' });
        })
})


// UPDATE
projectRouter.put('/:id', (req, res) => {
    const { id } = req.params;
    const content = req.body;
    if (!content.name || !content.description) {
        res.status(400).json({ error:  'Please include a "name" string and "description" string with your PUT request' })
    }
    db.update(id, content)
    .then(suc => {
        res.status(201).json(suc)
        })
        .catch(() => {
            res.status(500).json({ error: 'Internal server error' })
        })
    });
    
    
    // DELETE
    projectRouter.delete('/:id', (req, res) => {
        const { id } = req.params;
        db.remove(id)
        .then(suc => {
            res.status(200).json(suc);
        })
        .catch(() => {
            res.status(500).json({ error: 'Internal server error' });
        })
    });
        
    // Middleware
    function validateProjectBody(req, res, next) {
        if (req.body.name === undefined || req.body.description === undefined) {
            res.status(400).json({ error: 'Please include a "name" string, "description" string, and "completed" boolean with your POST request' })
        } else {
            next();
        }
    }
    
    module.exports = projectRouter;
    