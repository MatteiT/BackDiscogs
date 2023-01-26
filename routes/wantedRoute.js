const express = require('express');
const router = express.Router();
const wantedControllers = require('../controllers/wantedControllers');
const verifyJWT = require('../middleware/verifyJWT');

// Use the verifyJWT middleware for all routes
router.use(verifyJWT);

// Route for handling wanted operations
router.route('/')
.get(wantedControllers.getAllWanteds)
.post(wantedControllers.createWanted)

// Route for handling operations on a specific wanted by id
router.route('/:id')
.get(wantedControllers.getWantedById)
.put(wantedControllers.updateWanted)
.delete(wantedControllers.deleteWanted)

module.exports = router;
