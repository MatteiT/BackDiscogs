const express = require('express');
const router = express.Router();
const artistControllers = require('../controllers/artistControllers');
const verifyJWT = require('../middleware/verifyJWT');

router.use(verifyJWT);

router.route('/')
.get(artistControllers.getArtists)
.get(artistControllers.getArtistById)
.post(artistControllers.createNewArtist)
.delete(artistControllers.removeArtist);


module.exports = router;