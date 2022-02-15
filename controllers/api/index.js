const router = require('express').Router();
const userRoutes = require('./userRoutes');
const projectRoutes = require('./projectRoutes');
const listRoutes = require('./listRoutes');
const taskRoutes = require('./taskRoutes')

router.use('/users', userRoutes);
router.use('/projects', projectRoutes);
router.use('/list', listRoutes)
router.use('/task', taskRoutes)

module.exports = router;
