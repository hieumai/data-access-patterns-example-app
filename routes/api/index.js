var router = require('express').Router();

router.use('/', require('./users'));
router.use('/profiles', require('./profiles'));
router.use('/articles', require('./articles'));
router.use('/tags', require('./tags'));

// v1 use code that access database directly from the handlers
router.use('/v1', require('./v1'));

// v2 use Table Data Gateway Patterns to access data from the database
router.use('/v2', require('./v2'));

module.exports = router;