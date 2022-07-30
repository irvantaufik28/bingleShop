const express = require('express')
const router =express.Router()
const frontend = require('../controllers/frontend.controller')

router.get('/produkHome', frontend.getProdukHome)
router.get('/produkPage', frontend.getProdukPage)
router.get('/produkDetil/:url', frontend.getProdukDetil)

module.exports = router