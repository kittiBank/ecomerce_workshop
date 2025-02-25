
exports.create = async(req, res) => {

    try {
        //code
        res.send('Hello Categories controllers')
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Server error"})
        
    }
}

exports.list = async(req, res) => {

    try {
        //code
        res.send('Hello Categories list controllers')
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Server error"})
    }
}

exports.remove = async(req, res) => {

    try {
        //code
        const id = req.params // Param ที่ส่งมาจาก Font
        console.log(id)
        res.send('Hello Categories Remove controllers')
    } catch (err)  {
        console.log(err)
        res.status(500).json({ message: "Server error"})
    }
}