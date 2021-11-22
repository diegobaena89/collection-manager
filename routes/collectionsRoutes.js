const express = require('express')
const router = express.Router()
const CollectionControler = require('../controllers/CollectionControler')


router.get('/', CollectionControler.showCollections)

module.exports = router