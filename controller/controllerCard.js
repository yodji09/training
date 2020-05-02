const {Card} = require('../models')

class ControllerCard {
    static findAll(req, res, next){
        let id = req.curentUser
        Card
            .findAll({
                where : {
                    UserId : id
                }
            })
            .then(card => {
                if (card){
                    res.status(200).json({
                        card,
                    })
                } else {
                    return next({
                        type : "Not Found",
                        code : 404,
                        msg : "Data Not Found"
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
    static create(req, res, next){
        const id = req.curentUser
        const {name, type, rarity} = req.body
        Card
            .create({
                name,
                type,
                rarity,
                UserId : id
            })
            .then(result => {
                if (result) {
                    res.status(201).json({
                        card : result
                    })
                } else {
                    return next({
                        code : 501,
                        type : "Cannot Implemented",
                        msg : "Cannot Create Data"
                    })
                }
            })
            .catch(err => {
                return next({
                    type : "Internal Server Error",
                    code : 500,
                    msg : "Something Went Wrong"
                })
            })
    }
    static findOne(req, res, next){
        const {id} = req.params
        Card
            .findByPk(id)
            .then(result => {
                if(result){
                    res.status(200).json({
                        card : result
                    })
                } else {
                    return next({
                        code : 404,
                        type : "Not Found",
                        msg : "Data Not Found"
                    })
                }
            })
            .catch(err => {
                console.log(err)
                return next({
                    code : 500,
                    type : "Internal Server Error",
                    msg : "Something Went Wrong"
                })
            })
    }
    static edit(req, res, next){
        const {id} = req.params
        const {name, type, rarity} = req.body
        const value = {
            name,
            type,
            rarity
        }
        Card
            .update(value, {
                where : {
                    id
                }
            })
            .then(result => {
                if(result) {
                    return Card.findByPk(id)
                } else {
                    return next({
                        code : 501,
                        type : "Cannot Implemented",
                        msg : "Something Went Wrong"
                    })
                }
            })
            .then(card => {
                if (card){
                    res.status(200).json({
                        card
                    })
                } else {
                    return next({
                        code : 404,
                        type : "Not Found",
                        msg : "Data Not Found"
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
    static delete(req, res, next){
        const {id} = req.params
        Card
            .destroy({
                where : {
                    id
                }
            })
            .then(result => {
                if(result){
                    res.status(200).json({
                        msg : `Succesfully delete card with id ${id}`
                    })
                } else {
                    return next({
                        code : 501,
                        type : "Cannot Implemented",
                        msg : "Cannot delete this card"
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
}

module.exports = ControllerCard