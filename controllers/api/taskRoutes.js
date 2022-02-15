const task = require('express').Router();
const { Task } = require('../../models');

task.get('/', async (req, res) => {
    try {
        const listData = await Task.findAll()

        res.status(200).json(listData)
    } catch (err) {
        res.status(500).json(err)
    }
})

task.post('/', async (req, res) => {
    //task_content: "create task"
    //list_id: 1
    try {
        const taskData = await Task.create(req.body)
        res.status(200).json(taskData)
    } catch (err) {
        res.status(500).json(err)
    }
});

task.put('/:id', async (req, res) => {
    try {
        const taskData = await Task.update(req.body, {
            where: {
                id: req.params.id
            },
        })
        if (!taskData) {
            res.status(404).json(taskData)
        } else {
            res.status(200).json(taskData)
        }
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = task