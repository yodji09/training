const {verifyToken} = require('../helpers/jwt')
const {User} = require('../models')

function authentication(req, res, next){
    let token = req.headers.token
    try {
        let decoded = verifyToken(token)
        let {id} = decoded
        User
            .findByPk(id)
            .then(user => {
                if(user){
                    req.curentUser = id
                    return next()
                } else {
                    return next({
                        code : 401,
                        type : "Unauthorized",
                        msg : "Please Login First"
                    })
                }
            })
    } catch (err){
        next({
            code : 500,
            type : "Internal Server Error",
            msg : "Something Went Wrong"
        })
    }
}

module.exports = authentication