const router = require('express').Router()
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')
const ControllerCard = require('../controller/controllerCard')

router.use(authentication)
router.get('/', ControllerCard.findAll)
router.post('/', ControllerCard.create)
router.get('/:id', authorization, ControllerCard.findOne)
router.put('/:id', authorization, ControllerCard.edit)
router.delete('/:id', authorization, ControllerCard.delete)

module.exports = router