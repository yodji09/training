const router = require('express').Router()
const UserRouter = require('./user')
const CardRouter = require('./card')

router.use("/user", UserRouter)
router.use("/card", CardRouter)

module.exports = router