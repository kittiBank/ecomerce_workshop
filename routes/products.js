const express = require('express')
const router = express.Router()
const { create, list, read, update, listby, remove, searchFilters } = require('../controllers/products')

// @END POINT http://localhost:5000/api/product (url for client for call api)
router.post('/product', create)
router.get('/products/:count', list)
router.get('/product/:id', read)
router.delete('/product/:id', remove)
router.put('/product/:id', update)
router.post('/productby', listby) //for sorting
router.post('/search/filters', searchFilters)

module.exports = router