const express = require('express');
const db = require('../../data/helpers/actionModel');
const projectsdb = require('../../data/helpers/projectModel');

const actionRouter = express.Router();

actionRouter.get('/', (req, res) => {
    db.get()
        .then(actions => {
            res.status(200).json(actions);
        })
        .catch(() => {
            res.status(500).json({ error: 'Internal server error' });
        })
});

actionRouter.get('/:id', (req, res) => {
    const { id } = req.params;
    projectsdb.getProjectActions(id)
        .then(actions => {
            res.status(200).json(actions)
        })
        .catch(() => {
            res.status(500).json({ error: 'Internal server error' })
        })
});

actionRouter.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.remove(id)
        .then()
        .catch()
})

module.exports = actionRouter;
