const Collection = require('../models/Collection');

// @desc    Get all collections
// @route   GET /collections
// @access  Private/Admin
const getCollections = async (req, res) => {
    const collections = await Collection.find({}).lean().exec();
    if (!collections) {
        res.status(404).json({ message: 'Collections not found' });
    } else {
        res.status(200).json(collections);
    }
};


// @desc    Get collection by ID
// @route   GET /collections/:id
// @access  Private/Admin
const getCollectionById = async (req, res) => {
    const collection = await Collection.findById(req.params.id);
    if (!collection) {
        res.status(404).json({ message: 'Collection not found' });
    } else {
        res.status(200).json(collection);
    }
};


// @desc    Create new collection
// @route   POST /collections
// @access  Private/Admin
const createCollection = async (req, res) => {
    const { user, title, text} = req.body;

    if (!user || !title) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    
    const collectionExists = await Collection.findOne({ title }).lean().exec();
    if (collectionExists) {
        return res.status(409).json({ message: 'Collection already exists' });
    }
    
    let newCollection = { user, title };
    if (text) {
        newCollection.text = text;
    }
    newCollection = await Collection.create(newCollection);
    
    if (newCollection) {
        res.status(201).json({ message: 'Collection created successfully', collection: newCollection });
    } else {
        res.status(400).json({ message: 'Invalid collection data' });
    }
};

// @desc    Update collection
// @route   PATCH /collections/:id
// @access  Private/Admin
const updateCollection = async (req, res) => {
    const { _id } = req.params;
    const { title, text } = req.body;
    
    const collection = await Collection.findById(_id);
    if (!collection) {
        return res.status(404).json({ message: 'Collection not found' });
    }
    if (collection.user !== req.user.id) {
        return res.status(401).json({ message: 'Not authorized to update this collection' });
    }
    if (!title) {
        return res.status(400).json({ message: 'Title field is required' });
    }
    const collectionExists = await Collection.findOne({ title, user: req.user.id });
    if (collectionExists) {
        return res.status(409).json({ message: 'Collection title already exists' });
    }
    collection.title = title;
    if (text) {
        collection.text = text;
    }
    await collection.save();
    res.json({ message: 'Collection updated successfully', collection });
};


// @desc    Delete collection
// @route   DELETE /collections/:id
// @access  Private/Admin
const deleteCollection = (async (req, res) => {
    const collection = await Collection.findOneAndDelete({_id: req.params.id});
    if (collection) {   
        res.json({message: 'Collection deleted', collection});
    }
    else {
        res.status(404).json({message: 'Collection not found'});
    }
});

module.exports = {
    getCollections,
    getCollectionById,
    createCollection,
    updateCollection,
    deleteCollection
};