const express = require('express')
const router = express.Router()
const { authCheck, adminCheck } = require('../middlewares/authCheck')
const { listUsers } = require('../controllers/user')

//Create ENDPOINT
router.get('/users', authCheck, adminCheck, listUsers) //Use middlewears for check user
router.post('/change-status')
router.post('/change-role')

router.post('/user/cart')
router.get('/user/cart')
router.delete('/user/cart')

router.post('/user/address')

router.post('/user/order')
router.get('/user/order')

module.exports = router