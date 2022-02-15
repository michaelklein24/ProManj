const list = require('express').Router();
const { List, Task } = require('../../models');

list.get('/', async (req, res) => {
    try {
        const listData = await List.findAll()

        res.status(200).json(listData)
    } catch (err) {
        res.status(500).json(err)
    }
})

list.get('/:id', async (req, res) => {
    try {
        const listData = await List.findByPk(req.params.id, {})
        if (!listData) {
            res.status(404).json(listData)
        } else {
            res.status(200).json(listData)
        }
    } catch (err) {
        res.status(500).json(err)
    }
})

list.post('/', async (req, res) => {
    console.log(req.body)
    // list_content: req.body.listContent,
    // list_id: req.body.list_id,
    // list_position: req.body.position_id,
    try {
        const listData = await List.create({
            listContent: req.body.listContent,
            // list_id: req.body.list_id,
            position_id: req.body.position_id,
        })
        res.status(200).json(listData)
    } catch (err) {
        res.status(500).json(err)
    }
});

list.put('/:id', async (req, res) => {
    try {
        const listData = await List.update(
            {
                list_content: req.body.list_content,
                position: req.body.position,
            },
            {
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