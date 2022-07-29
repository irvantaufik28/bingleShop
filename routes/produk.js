const express = require('express')
const router =express.Router()
const produk = require('../controllers/produk.controller')
const handleUpload = require('../libs/handleUpload')

router.get('/', produk.findAll)
router.post('/', handleUpload.single ('image'), produk.create)

module.exports = router