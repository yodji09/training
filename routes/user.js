const router = require('express').Router()
const ControllerUser = require('../controller/controllerUser')

router.get('/', (req, res) => {
    res.status(200).json({
        msg : "ROUTER MASUK"
    })
})
router.post('/register', ControllerUser.register)
router.post('/login', ControllerUser.login)

module.exports = router