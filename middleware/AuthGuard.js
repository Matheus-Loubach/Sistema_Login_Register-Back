const User = require("../models/users")
const jwt = require("jsonwebtoken")

 
const authGuard = async (req, res, next) => {
    
    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(" ") [1]
 
    // check if header has a token
    if(!token) return res.status(401).json({ errors: ["Acesso negado!"] })
 
    // check if token is valid
    try {
        const verified = jwt.verify(token, process.env.JWTSECRET)
 
        req.user = await User.findById(verified.id).select("-password")
        next()
    } catch (err) {
        res.status(400).json({errors: ["Token inválido."]})
    }
}
 
module.exports = authGuard