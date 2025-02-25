const express = require('express')
const router = express.Router()
const { create, list, remove } = require('../controllers/categories')

//@ENDPOINT http://localhost:5000/api/categories
router.post('/categories', create)
router.get('/categories', list)
router.delete('/categories/:id', remove)

module.exports = router