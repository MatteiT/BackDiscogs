const express = require('express');
const router = express.Router();
const collectionControllers = require('../controllers/collectionControllers');
const verifyJWT = require('../middleware/verifyJWT');

// Use the verifyJWT middleware for all routes
router.use(verifyJWT);

// Route for handling collection operations
router.route('/')
.get(collectionControllers.getCollections)
.post(collectionControllers.createCollection)

// Route for handling operations on a specific collection by id
router.route('/:id')
.get(collectionControllers.getCollectionById)
.patch(collectionControllers.updateCollection)
.delete(collectionControllers.deleteCollection)

// Route for handling operations on a specific collection by user id
router.route(':user')
.get(collectionControllers.getCollections)

module.exports = router;