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
        const { address } = req.body
        //console.log(address)
        const addressUser = await prisma.user.update({
            where: {
                id: Number(req.user.id)
            },
            data: {
                address: address
            }
        })

        res.json({ ok: true, message: "Address user update success" })
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Server Error' })
    }
}

exports.saveOrder = async (req, res) => {
    try {
        //Step1 Get User Cart
        const userCart = await prisma.cart.findFirst({
            where: {
                orderById: Number(req.user.id)
            },
            include: { products: true }
        })

        //Check Empty
        if (!userCart || userCart.products.length === 0) {
            return res.status(400).json({ ok: false, message: 'Cart is Empty' })
        }

        //Check quantity
        for (const item of userCart.products) {
            const product = await prisma.product.findUnique({
                where: { id: item.productId },
                select: { quantity: true, title: true }
            })
            //console.log(item)
            //console.log(product)
            if (!product || item.count > product.quantity) {
                return res.status(400).json({
                    ok: false,
                    message: `ขอภัย สินค้า ${product?.title || 'product'} หมด`
                })
            }
        }

        //Create a new order
        const order = await prisma.order.create({
            data: {
                products: {
                    create: userCart.products.map((item) => ({
                        productId: item.productId,
                        count: item.count,
                        price: item.price
                    }))
                },
                orderBy: {
                    connect: { id: req.user.id }
                },
                cartTotal: userCart.cartTotal
            }
        })

        //Update Prodcute
        const update = userCart.products.map((item) => ({
            where: { id: item.productId },
            data: {
                quantity: { decrement: item.count },
                sold: { increment: item.count }
            }
        }))

        await Promise.all( //Waiting process all 
            update.map((updated) => prisma.product.update(updated))
        )

        await prisma.cart.deleteMany({
            where: { orderById: Number(req.user.id) }
        })

        //console.log(update)
        //console.log(order)
        res.json({ ok: true, order })

    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Server Error' })
    }
}

exports.getOrder = async (req, res) => {
    try {
        const orders = await prisma.order.findMany({
            where: { orderById: Number(req.user.id) },
            include: {
                products: {
                    include: {
                        product: true
                    }
                }
            }
        })
        if (orders.length === 0) {
            return res.status(400).json({ ok: false, message: "No orders" })
        }

        res.json({ ok: true, orders })

    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Server Error' })
    }
}