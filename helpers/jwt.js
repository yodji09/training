const jwt = require('jsonwebtoken')

function generateToken(payloads){
    return jwt.sign(payloads, process.env.secret)
}

function verifyToken(token){
    return jwt.verify(token, process.env.secret)
}

module.exports = {generateToken, verifyToken}