const prisma = require("../config/prisma")

exports.create = async (req, res) => {
    try {
        const { title, description, price, quantity, categoryId, images } = req.body
        //console.log(title, description, price, quantity, categoryId, images)
        const product = await prisma.product.create({
            data: {
                title: title, //table: font (should samename for easy to match)
                description: description,
                price: parseFloat(price),
                quantity: parseInt(quantity),
                categoryId: parseInt(categoryId),
                images: {
                    create: images.map((item) => ({
                        asset_id: item.asset_id,
                        public_id: item.public_id,
                        url: item.url,
                        secure_url: item.secure_url
                    })) // Return to Object ()
                }
            }
        })
        console.log(product)
        res.send('Hello create product controller')
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Server Error' })
    }
}

exports.list = async (req, res) => {
    try {

        const { count } = req.params
        const products = await prisma.product.findMany({
            //get no. from req to limit count
            take: parseInt(count),
            //sorting lastest 
            orderBy: { createdAt: "desc" },
            //get data of other table
            include: {
                category: true,
                images: true
            }
        })

        res.send(products)
    } catch (err) {
        console.log('err')
        res.status(500).json({ message: 'Server Error' })
    }
}

exports.read = async (req, res) => {
    try {
        const { id } = req.params
        const products = await prisma.product.findFirst({
            where: {
                id: Number(id)
            },
            include: {
                category: true,
                images: true
            }
        })

        res.send(products)

    } catch (err) {
        console.log(500).json({ message: 'Server Error' })
    }
}

exports.remove = async (req, res) => {
    try {
        //Wait for Del Image clound, other table
        const { id } = req.params
        await prisma.product.delete({
            where: {
                id: Number(id)
            }
        })

        res.send('Delete Sucessful')
    } catch (err) {
        console.log('err')
        res.status(500).json({ message: 'Server Error' })
    }
}

exports.update = async (req, res) => {
    try {

        //Clear for Image first, before insert new image
        await prisma.image.deleteMany({
            where: {
                productId: Number(req.params.id)
            }
        })

        const { title, description, price, quantity, categoryId, images } = req.body
        const products = await prisma.product.update({
            where: {
                id: Number(req.params.id)
            },
            data: {
                title: title,
                description: description,
                price: parseFloat(price),
                quantity: parseInt(quantity),
                categoryId: parseInt(categoryId),
                images: {
                    create: images.map((item) => ({
                        asset_id: item.asset_id,
                        public_id: item.public_id,
                        url: item.url,
                        secure_url: item.secure_url
                    }))
                }
            }
        })

        res.send(products)
    } catch (err) {
        console.log(500).json({ message: "Server Error" })
    }
}

exports.listby = async (req, res) => {
    try {

        const { sort, order, limit } = req.body
        //console.log(sort, order, limit)
        const product = await prisma.product.findMany({
            take: limit,
            orderBy: { [sort]: order },
            include: { category: true }
        })

        res.send(product)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Server Error' })
    }
}

const handleQuery = async (req, res, query) => {
    try {
        const products = await prisma.product.findMany({
            where: {
                title: {
                    contains: query
                }
            },
            include: {
                category: true,
                images: true
            }
        })
        res.send(products)
    } catch (err) {
        console.log(err)
        res.status(500).send('Search Error')
    }
}

const handlePrice = async (req, res, priceRange) => {
    try {
        const product = await prisma.product.findMany({
            where: {
                price: {
                    gte: priceRange[0],
                    lte: priceRange[1]
                }
            },
            include: {
                category: true,
                images: true
            }
        })

        res.send(product)

    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Search error' })
    }
}

exports.searchFilters = async (req, res) => {
    try {
        //Include 3 serach functions
        const { query, category, price } = req.body

        if (query) {
            console.log('query-->', query)
            await handleQuery(req, res, query)
        }
        if (category) {
            console.log('category-->', category)
        }
        if (price) {
            console.log('price-->', price)
            await handlePrice(req, res, price)
        }

        //res.send('Hello searchFilters product controller')
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Server Error' })
    }
}