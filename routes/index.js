const auth_routing = require('./auth_routing');

const router = require('express').Router()

//merge and export router;
router.use("/", auth_routing);

module.exports = router;

