var router = require('express').Router();

// v1 use code that access database directly from the handlers
router.use('/v1', require('./v1'));

// v2 use Table Data Gateway Patterns to access data from the database
router.use('/v2', require('./v2'));

// v3 use Row Data Gateway Patterns to access data from the database
router.use('/v3', require('./v3'));

// v4 use Active Record Patterns to access data from the database
router.use('/v4', require('./v4'));

// v5 use Data Mapper Patterns to access data from the database
router.use('/v5', require('./v5'));

module.exports = router;