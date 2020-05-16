const jwt = require('jsonwebtoken');


const authenicationMiddleWare = (req, res, next) => {
    const token = req.header('auth-token');

    try {
        jwt.verify(token, process.env.SECRET, (error, data) => {
            if (error) {
                res.send(error)
            } else {
                next()
            }
        })


    } catch (error) {
        res.sendStatus(403)
    }
}

module.exports = authenicationMiddleWare;