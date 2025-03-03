const express = require('express')
const router = express.Router()
const { create, list, listby, remove, searchFilters } = require('../controllers/products')

// @END POINT http://localhost:5000/api/product (url for client for call api)
router.post('/product', create)
router.get('/products/:count', list)
router.delete('/product/:id', remove)
router.post('/productby', listby) //for sorting
router.post('/search/filters', searchFilters)

module.exports = router