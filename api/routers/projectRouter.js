const express = require('express');
const db = require('../../data/helpers/projectModel');

const projectRouter = express.Router();

projectRouter.get('/', (req, res) => {
    db.get()
        .then(projects => {
            res.status(200).json(projects);
        })
        .catch(() => {
            res.status(500).json({ error: 'Internal server error' });
        })
});

module.exports = projectRouter;
