const prisma = require("../config/prisma")

exports.listUsers = async (req, res) => {
    try {
        //code
        const users = await prisma.user.findMany({
            //SELECT FIELD
            select: {
                id: true,
                email: true,
                role: true,
                enabled: true,
                address: true
            }
        })
        res.json(users)
        //  res.send('Hello User Controller')
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Server Error' })
    }
}

exports.changeStatus = async (req, res) => {
    try {

        const { id, enabled } = req.body
        console.log(id, enabled)
        const user = await prisma.user.update({
            where: { id: Number(id) },
            data: { enabled: enabled }
        })

        res.send('Update Status Success')
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Server Error' })
    }
}

exports.changeRole = async (req, res) => {
    try {
        const { id, role } = req.body

        const user = await prisma.user.update({
            where: { id: Number(id) },
            data: { role: role }
        })

        res.send('Update Role Success')
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Server Error' })
    }
}

exports.userCart = async (req, res) => {
    try {

        const { cart } = req.body
        console.log(cart)
        console.log(req.user.id)

        const user = await prisma.user.findFirst({
            where: { id: Number(req.user.id) }
        })
        //console.log(user)

        //Delete old item in cart, before add new item in cart
        await prisma.productOnCart.deleteMany({
            where: {
                cart: { orderById: user.id }
            }
        })

        //Delete old cart, before add new cart
        await prisma.cart.deleteMany({
            where: { orderById: user.id }
        })

        // Prepare Product Mapping
        let products = cart.map((item) => ({
            productId: item.id,
            count: item.count,
            price: item.price
        }))

        //Cal sum price
        let cartTotal = products.reduce((sum, item) => sum + item.price * item.count, 0)

        //New cart
        const newCart = await prisma.cart.create({
            data: {
                products: { create: products },
                cartTotal: cartTotal,
                orderById: user.id
            }

        })

        console.log(newCart)

        res.send('Add Cart Successful')
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Server Error' })
    }
}

exports.getUserCart = async (req, res) => {
    try {

        //req.user.id
        const cart = await prisma.cart.findFirst({
            where: {
                orderById: Number(req.user.id)
            },
            include: {
                products: {
                    include: {
                        product: true
                    }
                }
            }
        })

        //console.log(cart)

        res.json({
            product: cart.products,
            cartTotal: cart.cartTotal
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Server Error' })
    }
}

exports.emptyCart = async (req, res) => {
    try {
        //code
        const cart = await prisma.cart.findFirst({
            where: { orderById: Number(req.user.id) }
        })

        if (!cart) {
            return res.status(400).json({ message: 'No cart' })
        }

        //เรียกใช้เลย ไม่ได้ประกาศตัวแปร เพราะไม่ได้เอาไปทำอะไรต่อ
        await prisma.productOnCart.deleteMany({
            where: {
                cardId: cart.id
            }
        })

        const result = await prisma.cart.deleteMany({
            where: { orderById: Number(req.user.id) }
        })


        console.log(result)
        res.json({
            message: 'Cart Empty Success',
            deletedCount: result.count
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Server Error' })
    }
}

exports.saveAddress = async (req, res) => {
    try {

        res.send('Hello saveAddress')
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Server Error' })
    }
}

exports.saveOrder = async (req, res) => {
    try {

        res.send('Hello saveOrder')
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Server Error' })
    }
}

exports.getOrder = async (req, res) => {
    try {

        res.send('Hello getOrder')
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Server Error' })
    }
}