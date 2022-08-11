const router = require('express').Router();
const controller = require('../controller/');


router.get('/report', controller.getReport);

module.exports = router;