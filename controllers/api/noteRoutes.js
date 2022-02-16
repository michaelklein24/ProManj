const note = require('express').Router();
const { Note, User } = require('../../models');

note.get('/', async (req, res) => {
    try {
        const noteData = await Note.findAll({
            include: [{ model: User }]
        })
        res.status(200).json(noteData)
    } catch (err) {
        res.status(500).json(err)
    }
})

note.post('/', async (req, res) => {
  
    try {
        const noteData = await Note.create(req.body)
        res.status(200).json(noteData)
    } catch (err) {
        res.status(500).json(err)
    }
});

note.put('/:id', async (req, res) => {
    try {
        const noteData = await Note.update(req.body, {
            where: {
                id: req.params.id
            },
        })
        if (!noteData) {
            res.status(404).json(`Note #${req.params.id} does not exist`)
        } else {
            res.status(200).json(noteData)
        }
    } catch (err) {
        res.status(500).json(err)
    }
})

note.delete('/:id', async (req, res) => {
    try {
        const noteData = await Note.destroy({
            where: {
                id: req.params.id
            },
        })
        if (!noteData) {
            res.status(404).json(`Note #${req.params.id} does not exist`)
        } else {
            res.status(200).json(`Note #${req.params.id} has been deleted`)
        }
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = note