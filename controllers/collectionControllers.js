const Collection = require('../models/Collection');

// @desc    Get all collections
// @route   GET /collections
// @access  Private/Admin
const getCollections = async (req, res) => {
    const collections = await Collection.find({}).lean().exec();
    if (!collections) {
        res.status(404);
        throw new Error('No collections found');
    }
    res.json(collections);
};

// @desc    Get collection by ID
// @route   GET /collections/:id
// @access  Private/Admin
const getCollectionById = (async (req, res) => {
    const collectionById = await Collection.findById(req.params.id);
    if (collectionById) {
        res.json(collectionById);
    } else {
        res.status(404);
        throw new Error('Collection not found');
    }
});

// @desc    Create new collection
// @route   POST /collections
// @access  Private/Admin
const createCollection = (async (req, res) => {
    const { user, title, text} = req.body;

    if (!user || !title) {
        return res.status(400).json({ message: 'All fields are required' })
    }
    const collectionExists = await Collection
        .findOne
        ({user, title})
        .lean ()
        .exec ();
    if (collectionExists) {
        res.status(409);
        throw new Error('Collection already exists');
    }

    if (text === undefined) {
        const text = '';
    }
    const newCollection = await Collection.create({user, title, text });
    if (newCollection) {
        res.status(201).json({message: 'Collection created successfully', collection: newCollection});
    }
    else {
        res.status(400);
        throw new Error('Invalid collection data');
    }
});

// @desc    Update collection
// @route   PUT /api/collections/:id
// @access  Private/Admin
const updateCollection = (async (req, res) => {
    const { user, title, text, wanted, artist, album } = req.body;
    if (!user || !title ) {
        res.status(400);
        throw new Error('Please fill in all fields');
    }
    const collection = await Collection.findById(id);
    if (collection) {
        collection.user = user;
        collection.title = title;
        collection.text = text;
        collection.Wanted = wanted;
        collection.Artist = artist;
        collection.Album = album;
        const updatedCollection = await collection.save();
        res.json({message: 'Collection updated', collection: updatedCollection});
    }
    else {
        res.status(404);
        throw new Error('Collection not found');
    }
});

// @desc    Delete collection
// @route   DELETE /collections/:id
// @access  Private/Admin
const deleteCollection = (async (req, res) => {
    const  {id } = req.body || req.params.id;
    if (!id) {
        return res.status(400).json({ message: 'Collection ID required' })
    }
    const collection = await Collection.findById(id).exec();
    if (!collection) {
        return res.status(404).json({ message: 'Collection not found' })
    }
    await collection.deleteOne();
    res.json({ message: 'Collection deleted' })
});


module.exports = {
    getCollections,
    getCollectionById,
    createCollection,
    updateCollection,
    deleteCollection
};