const jwt = require('jsonwebtoken')
const prisma = require('../config/prisma')

exports.authCheck = async (req, res, next) => {
    try {
        //code
        const headerToken = req.headers.authorization //Get token form font
        console.log(headerToken)
        if (!headerToken) {
            return res.status(401).json({ message: 'No token, Authorization' })
        }
        const token = headerToken.split(" ")[1]

        const decode = jwt.verify(token, process.env.SECRET) //Check decode match in env. key
        req.user = decode //ประกาศมารับค่า decode วิ่งไปทุกหน้า

        const user = await prisma.user.findFirst({
            where: {
                email: req.user.email
            }
        })

        if (!user.enabled) {
            return res.status(400).json({ message: 'This account is not enable' })
        }

        //console.log(user)
        //console.log('Hello MiddleWear')
        next()
    } catch (err) {
        console.log(err)
        res.status(500).json({ messgae: 'Token Invalid' })
    }
}

exports.adminCheck = async (req, res, next) => {
    try {
        const { email } = req.user
        const adminUser = await prisma.user.findFirst({
            where: { email: email }
        })
        if(!adminUser || adminUser.role !== 'admin') {
            return res.status(403).json({ message: 'Access deine: Admin only' })
        }
        console.log('admin check', email)

        next()

    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Error Admin access denied' })
    }
}