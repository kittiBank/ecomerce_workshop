const express = require('express')
const router = express.Router()

router.get('/register',(req,res)=>{
    //code
    res.send('Hello Register')

})

module.exports = router