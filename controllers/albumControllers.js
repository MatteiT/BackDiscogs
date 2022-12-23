const Album = require('../models/Album');

// @desc Get all albums
// @route GET /albums
// @access Private
const getAlbums = async (req, res) => {
    const albums = await Album.find({}).lean ();
    if (!albums) {
        res.status(404);
        throw new Error('No albums found');
    }
    res.json(albums);
};


// @desc Get album by ID
// @route GET /albums/:id
// @access Private
const getAlbumById = (async (req, res) => {
    const albumById = await Album.findById(req.params.id);
    if (albumById) {
        res.json(albumById);
    } else {
        res.status(404);
        throw new Error('Album not found');
    }
});

// @desc Create new album
// @route POST /albums
// @access Private
const createAlbum = (async (req, res) => {
    const { artist, title, text, uri, DiscogsId } = req.body;
    if (!artist || !title || !text || !uri || !DiscogsId) {
        res.status(400);
        throw new Error('Please fill in all fields');
    }
    const albumExists = await Album
        .findOne
        ({DiscogsId})
        .lean ()
        .exec ();
    if (albumExists) {
        res.status(409);
        throw new Error('Album already exists');
    }

    const newAlbum = await Album.create({artist, title, text , uri, DiscogsId});
    if (newAlbum) {
        res.status(201).json({message: 'Album created successfully', album: newAlbum});
    }
    else {
        res.status(400);
        throw new Error('Invalid album data');
    }
});

// @desc Remove album
// @route DELETE /albums/:id
// @access Private
const deletealbum = (async (req, res) => {
    const album = await Album.findById(req.params.id);
    if (album) {
        await album.remove();
        res.json({message: 'Album removed'});
    } else {
        res.status(404);
        throw new Error('Album not found');
    }
}
);

module.exports = {
    getAlbums,
    getAlbumById,
    createAlbum,
    deletealbum
};






