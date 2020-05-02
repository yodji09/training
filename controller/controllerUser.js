const {User} = require('../models')
const {compare} = require('../helpers/bcrypt')
const {generateToken} = require('../helpers/jwt')

class ControllerUser {
    static register(req, res, next){
        const {name, username, email, password, birthdate, gender, confirmpassword} = req.body
        const value = {
            name,
            username,
            email,
            password,
            birthdate,
            gender
        }
        if(password !== confirmpassword){
            return next({
                code: 400,
                type : "Bad Request",
                msg: "password doesn't match"
            })
        }
        User
            .create(value)
            .then(user => {
                res.status(201).json({
                    id : user.id,
                    email : user.email
                })
            })
            .catch(err => {
                if(err.name){
                    return next(err)
                } else {
                    return next({
                        code : 500,
                        msg : "Something Went Wrong",
                        type : "Internal Server Error"
                    })
                }
            })
    }
    static login(req, res, next){
        const {email, password} = req.body
        User
            .findOne({
                where : {
                    email,
                }
            })
            .then(user => {
                if(!compare(password, user.password)){
                    return next ({
                        type : "Not Acceptable",
                        msg : "Password doesn't match",
                        code : 406
                    })
                } else {
                    let token =  generateToken({
                        id : user.id,
                        email : user.email
                    })
                    res.status(202).json({
                        Token : token
                    })
                }
            })
            .catch(err => {
                return next({
                    code : 500,
                    type : "Internal Server Error",
                    msg : "Something went wrong"
                })
            })
    }
}

module.exports = ControllerUser