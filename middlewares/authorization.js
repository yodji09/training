const {Card} = require('../models')

function authorization(req, res, next){
    const {id} = req.params
    Card
        .findByPk(id)
        .then(card => {
            if (card.UserId === req.curentUser){
                next()
            } else {
                return next({
                    code : 401,
                    type : "Unauthorized",
                    msg : "You are not authorized to do this"
                })
            }
        })
        .catch(err => {
            return next({
                code : 500,
                type : "Internal Server Error",
                msg : "Something Went Wrong"
            })
        })
}

module.exports = authorization