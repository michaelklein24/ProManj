const list = require('express').Router();
const { List, Task } = require('../../models');

list.get('/', async (req, res) => {
    try {
        const listData = await List.findAll({
            include: [{ model: Task }]
        })
        res.status(200).json(listData)
    } catch (err) {
        res.status(500).json(err)
    }
})

list.post('/', async (req, res) => {
    // "list_content":"hello",
    // "position":1,
    // "project_id":1
    try {
        const listData = await List.create(req.body)
        res.status(200).json(listData)
    } catch (err) {
        res.status(500).json(err)
    }
});

list.put('/:id', async (req, res) => {
    try {
        const listData = await List.update(req.body, {
            where: {
                id: req.params.id
            },
        })
        if (!listData) {
            res.status(404).json(listData)
        } else {
            res.status(200).json(listData)
        }
    } catch (err) {
        res.status(500).json(err)
    }
})

list.delete('/:id', async (req, res) => {
    try {
        const listData = await List.destroy({
            where: {
                id: req.params.id
            },
        })
        if (!listData) {
            res.status(404).json(`list with id=${req.params.id} does not exist`)
        }
        res.status(200).json(`list #${req.params.id} has been deleted`)
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = list