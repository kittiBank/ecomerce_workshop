const prisma = require("../config/prisma")

exports.create = async (req, res) => {

    try {
        const { name } = req.body
        const categories = await prisma.category.create({
            data: {
                name: name
            }
        })

        res.send(categories)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Server error" })

    }
}

exports.list = async (req, res) => {

    try {
        const categories = await prisma.category.findMany()
        res.send(categories)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Server error" })
    }
}

exports.remove = async (req, res) => {

    try {
        const { id } = req.params // Param ที่ส่งมาจาก Font (#Destructuring)
        const categories = await prisma.category.delete({
            where: {
                id: Number(id)
            }
        })

        res.send(categories)
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Server error" })
    }
}