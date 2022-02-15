const router = require('express').Router();
const userRoutes = require('./userRoutes');
const projectRoutes = require('./projectRoutes');
const listRoutes = require('./listRoutes');
const taskRoutes = require('./taskRoutes');
const noteRoutes = require('./noteRoutes');

router.use('/users', userRoutes);
router.use('/projects', projectRoutes);
router.use('/list', listRoutes);
router.use('/task', taskRoutes);
router.use('/note', noteRoutes);

module.exports = router;
