const express = require('express');
const router = express.Router();
const albumControllers = require('../controllers/albumControllers');
const verifyJWT = require('../middleware/verifyJWT');

router.use(verifyJWT);

router.route('/')
.get(albumControllers.getAlbums)
.get(albumControllers.getAlbumById)
.post(albumControllers.createAlbum)
.delete(albumControllers.deletealbum);


module.exports = router;