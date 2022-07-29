const express = require('express')
const router =express.Router()
const frontend = require('../controllers/frontend.controller')

router.get('/produkHome', frontend.getProdukHome)
router.get('/produkPage', frontend.getProdukPage)

module.exports = router