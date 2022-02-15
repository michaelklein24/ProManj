const router = require('express').Router();
const userRoutes = require('./userRoutes');
const projectRoutes = require('./projectRoutes');
const listRoutes = require('./listRoutes')

router.use('/users', userRoutes);
router.use('/projects', projectRoutes);
router.use('/list', listRoutes)

module.exports = router;
