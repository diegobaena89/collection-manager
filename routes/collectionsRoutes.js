const express = require('express');
const router = express.Router();
const CollectionControler = require('../controllers/CollectionControler');

// helper
const checkAuth = require('../helpers/auth').checkAuth;

router.get('/add', checkAuth, CollectionControler.createCollection);
router.post('/add', checkAuth, CollectionControler.createCollectionSave);
router.get('/edit/:id', checkAuth, CollectionControler.updateCollection);
router.post('/edit', checkAuth, CollectionControler.updateCollectionSave);
router.get('/dashboard', checkAuth, CollectionControler.dashboard);
router.post('/remove', checkAuth, CollectionControler.removeCollection);
router.get('/', CollectionControler.showCollections);

module.exports = router;
