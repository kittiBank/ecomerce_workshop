exports.create = async (req, res) => {
    try {

        res.send('Hello create product controller')
    } catch (err) {
        console.log('err')
        res.status(500).json({ message: 'Server Error' })
    }
}

exports.list = async (req, res) => {
    try {

        res.send('Hello list product controller')
    } catch (err) {
        console.log('err')
        res.status(500).json({ message: 'Server Error' })
    }
}

exports.remove = async (req, res) => {
    try {

        res.send('Hello remove product controller')
    } catch (err) {
        console.log('err')
        res.status(500).json({ message: 'Server Error' })
    }
}

exports.listby = async (req, res) => {
    try {

        res.send('Hello listby product controller')
    } catch (err) {
        console.log('err')
        res.status(500).json({ message: 'Server Error' })
    }
}

exports.searchFilters = async (req, res) => {
    try {

        res.send('Hello searchFilters product controller')
    } catch (err) {
        console.log('err')
        res.status(500).json({ message: 'Server Error' })
    }
}