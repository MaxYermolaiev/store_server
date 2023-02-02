const auth_routing = require('./auth_routing');
const action_routing = require('./action_routing');
const admin_routing= require('./admin_routing');
const router = require('express').Router()

//merge and export router;
router.use("/", auth_routing);
router.use("/", action_routing);
router.use("/", admin_routing);
module.exports = router;

