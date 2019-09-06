const express = require('express');
const db = require('../../data/helpers/actionModel');
const projectsdb = require('../../data/helpers/projectModel');

const actionRouter = express.Router();


// CREATE
actionRouter.post('/', validateActionBody, (req, res) => {
    db.insert(req.body)
    .then(suc => {
        res.status(201).json(suc);
    })
    .catch(() => {
        res.status(500).json({ error: 'Internal server error' });
    })
});

// READ
actionRouter.get('/', (req, res) => {
    db.get()
        .then(actions => {
            res.status(200).json(actions);
        })
        .catch(() => {
            res.status(500).json({ error: 'Internal server error' });
        })
});

actionRouter.get('/:project_id', (req, res) => {
    const { project_id } = req.params;

    projectsdb.getProjectActions(project_id)
        .then(actions => {
            res.status(200).json(actions);
        })
        .catch(() => {
            res.status(500).json({ error: 'Internal server error' });
        })
});

// UPDATE
actionRouter.put('/:id', (req, res) => {
    const { id } = req.params;
    const content = req.body;

    db.update(id, content)
        .then(suc => {
            res.status(202).json(suc);
        })
        .catch(() => {
            res.status(500).json({ error: 'Internal server error' });
        })
});

// DELETE
actionRouter.delete('/:id', validateActionId, (req, res) => {
    const { id } = req.params;
    db.remove(id)
        .then(() => {
            res.status(204).send(`Successfully deleted the action with the ID: ${id}`);
        })
        .catch(() => {
            res.status(500).json({ error: 'Internal server error' });
        })
});

// Middleware
function validateActionBody(req, res, next) {
    if (req.body.notes === undefined || req.body.description === undefined || req.body.project_id === undefined) {
        res.status(400).json({ error: 'Please include a "notes" string, "description" string, and "completed" boolean with your POST request' });
    } else {
        next();
    }
};

function validateActionId(req, res, next) {
    db.get(req.params.id)
        .then(suc => {
            if (suc) {
                next();
            } else {
                res.status(400).json({ error: 'Invalid action Id' });
            }
        })
        .catch(() => {
            res.status(500).json({ error: 'Internal server error' });
        })
};

module.exports = actionRouter;
