const Artist = require('../models/Artist');


// @desc    Get all artists
// @route   GET /artists
// @access  Private
const getArtists = async (req, res) => {
    const artists = await Artist.find({}).lean().exec();
    if (!artists) {
        res.status(404);
        throw new Error('No artists found');
    }
    res.json(artists);
}

// @desc    Get artist by ID
// @route   GET /artists/:id
// @access  Private
const getArtistById = async (req, res) => {
    const artistById = await Artist.findById(req.params.id);
    if (artistById) {
        res.json(artistById);
    } else {
        res.status(404);
        throw new Error('Artist not found');
    }
}

// @desc    Create new artist
// @route   POST /artists
// @access  Private
const createNewArtist = async (req, res) => {
    const { title, type, ArtistId, uri } = req.body;
    if (!title || !type || !ArtistId || !uri) {
        return res.status(400).json({ message: 'All fields are required' })
    }
    const artistExists = await Artist
        .findOne
        ({ ArtistId})
        .lean()
        .exec();
    if (artistExists) {
        res.status(409);
        throw new Error('Artist already exists');
    }

    const newArtist = await Artist.create({ title, type, ArtistId, uri});
    if (newArtist) {
        res.status(201).json({message: 'Artist created successfully', artist: newArtist});
    }
    else {
        res.status(400);
        throw new Error('Invalid artist data');
    }
}

// @desc    Remove artist
// @route   DELETE /artists/:id
// @access  Private
const removeArtist = async (req, res) => {
    const id = req.params.id || req.body.id;
    const artist = await Artist.findById(id).exec();
    if (artist) {
        await artist.deleteOne();
        res.json({ message: 'Artist removed' });
    } else {
        res.status(404);
        throw new Error('Artist not found');
    }
}

module.exports = {
    getArtists,
    getArtistById,
    createNewArtist,
    removeArtist
}


