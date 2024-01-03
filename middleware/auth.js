const jwt = require('jsonwebtoken')
const secret_key = process.env.JWT_SECRET_KEY

function auth(req, res, next){
    const token = req.header('x-auth-token');

    if(!token){
        res.status(401).send('Token error. Please add token.')
        return
    }

    try{
        req.admin = jwt.verify(token, secret_key)
        next()
    }catch (e){
        return res.status(401).send('Invalid token.')
    }
}

module.exports = auth