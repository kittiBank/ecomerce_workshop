
exports.listUsers = async (req, res) => {
    try {
        //code
        res.send('Hello User Controller')
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: 'Server Error' })
    }
}