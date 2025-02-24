const express = require('express')
const router = express.Router()

//@ENDPOINT http://localhost:5000/api/categories
router.get('/categories',(req,res)=> {
    //code
    res.send('Hello categories')
})

module.exports = router