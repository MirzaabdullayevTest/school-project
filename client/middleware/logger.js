function log(req, res, next){
    console.log({
        url: req.url,
        method: req.method,
        date: new Date()
    })
    next()
}

module.exports = log