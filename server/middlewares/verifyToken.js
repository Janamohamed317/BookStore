const jwt = require("jsonwebtoken")
const { Order } = require("../models/Order")

// verify ll token
function verifyToken(req, res, next) {
    const token = req.headers.token
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
            req.user = decoded
            next()
        } catch (error) {
            res.status(401).json({ message: "Invalid Token" })
        }
    }
    else {
        res.status(401).json({ message: "No token is Provided" })
    }
}


function verifyTokenAndOrderOwner(req, res, next) {
    verifyToken(req, res, async () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next()
        }
        else {
            res.status(403).json({ message: "You are not allowed" })
        }
    })
}


function verifyOrderDetails(req, res, next) {
    verifyToken(req, res, async () => {

        const order = await Order.findById(req.params.id)
        if (!order) {
            res.status(403).json({ message: "Not Found" })
        }

        if (req.user.id === order.user.toString() || req.user.isAdmin) {
            next()
        }
        else {
            res.status(403).json({ message: "You are not allowed" })
        }
    })
}



// verify ll user
function verifyTokenAndUser(req, res, next) {
    verifyToken(req, res, async () => {
        if (req.user.id === req.params.id || req.user.isAdmin) {
            next()
        }
        else {
            res.status(403).json({ message: "You are not allowed, You Can Update or View Only Your Info" })
        }
    })
}

// verify ll admin
function verifyTokenAndAdmin(req, res, next) {
    verifyToken(req, res, () => {
        if (req.user.isAdmin) {
            next()
        }
        else {
            res.status(403).json({ message: "You are not allowed, Only Admin is Allowed" })
        }
    })

}
module.exports = {
    verifyToken,
    verifyTokenAndUser,
    verifyTokenAndAdmin,
    verifyTokenAndOrderOwner,
    verifyOrderDetails
}