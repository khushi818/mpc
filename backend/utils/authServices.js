const jwt = require("jsonwebtoken")

const signToken = async(id) => {
    return await jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '24h'
    })
}

const verifyToken  = async (token) => {
    return jwt.verify(token, process.env.JWT_SECRET)
}

module.exports = {
    verifyToken,
    signToken
}