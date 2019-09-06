const express = require('express');
const db = require('../../data/helpers/actionModel');

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

module.exports = actionRouter;
