const express = require('express');
const db = require('../../data/helpers/projectModel');
const actionRouter = require('./actionRouter');

const projectRouter = express.Router();

projectRouter.use('/:id/actions', actionRouter)

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
    db.getProjectActions(id)
        .then(actions => {
            res.status(200).json(actions)
        })
        .catch(() => {
            res.status(500).json({ error: 'Internal server error' })
        })
})

// projectRouter.delete('/', (req, res) => {
//     const { id } = req.params;
//     db.remove(id)
//         .then()
//         .catch()
// })

// projectRouter.post('/', (req, res) => {    
    // if (!req.body.name || !req.body.description) {
    //     res.status(400).json({ error: 'Please include a "name" string, "description" string, and "completed" boolean with your POST request' })
    // } else {
        // db.insert(req.body)
        //     .then(suc => {
        //         res.status(201).json(suc);
        //     })
        //     .catch(() => {
        //         res.status(500).json({ error: 'Internal server error' });
        //     })
    // }
// })

module.exports = projectRouter;
