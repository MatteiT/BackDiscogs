const express = require('express');
const router = express.Router();
const collectionControllers = require('../controllers/collectionControllers');
const verifyJWT = require('../middleware/verifyJWT');

router.use(verifyJWT);

router.route('/')
.get(collectionControllers.getCollections)
.post(collectionControllers.createCollection)
.put(collectionControllers.updateCollection)
.delete(collectionControllers.deleteCollection);


module.exports = router;