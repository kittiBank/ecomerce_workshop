const prisma = require('../config/prisma')  // To use Prisma to connect DB
const bcrypt = require('bcryptjs') // To encrypt password > npm i bcryptjs jsonwebtoken
const jwt = require('jsonwebtoken')

// To make function (const -> Export use in other file)
exports.register = async (req, res) => {

    try {
        const { email, password } = req.body // Get from Font

        //Step 1 Validate body
        if (!email) { // Check Email dones't have value
            res.status(400).json({ message: "Email is require !!!" }) //msg to font
        }
        if (!password) {
            res.status(400).json({ message: "Password is require !!!" })
        }

        //Step 2 Check Email in DB already ?
        const user = await prisma.user.findFirst({ //Await is important, use prisma to find data in DB
            where: {
                email: email
            }
        })
        if (user) {
            return res.status(400).json({ message: "Email already exits!!"})
        }
        
        // Step 3 HashPassword 
        const hashPassword = await bcrypt.hash(password, 10)

        // Step 4 Register
        await prisma.user.create({
            data: {
                email: email,
                password: hashPassword
            }
        })

        res.send('Register success')
        
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Server Error" })
    }

}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body

        // Step 1 Check Email
        const user = await prisma.user.findFirst({
            where: {
                email: email
            }
        })
        if(!user || !user.enabled) {
            return res.status(400).json({ message: "User not found or not enabled"})
        }

        // Step 2 Check Password
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) {
            return res.status(400).json({ message: "Password Invalid"})
        }

        // Step 3 Create Payload
        const paylode = {
            id: user.id,
            email: user.email,
            role: user.role
        }

        // Step 4 Generate token
        jwt.sign(paylode, process.env.SECRET, { expiresIn: '3h'},(err, token) => { // Use JWT to make token for secure login
            if(err) {
                return res.status(500).json({ message: "Server Error"})
            }
            res.json({ paylode, token })
        }) 

    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Server Error" })
    }
}

//Wait for Mid Ware for security 
exports.currentUser = async (req, res) => {

    try {
        //code
        res.send('Hello currentUser in Controllers')
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Server Error" })
    }
}