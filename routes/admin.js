//Import
const express = require('express')
const { authCheck } = require('../middlewares/authCheck')
const router = express.Router()
//Import controller
const { getOrderAdmin, changOrderStatus } = require('../controllers/admin')

router.put('/admin/orders-status', authCheck, changOrderStatus)
router.get('/admin/orders', authCheck, getOrderAdmin)

module.exports = router