const Wanted = require('../models/wantedModel');

const createWanted = async (req, res) => {
try {
    const { playlist, collection } = req.body;

    if (!playlist || !collection) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const newWanted = new Wanted({ playlist, collection });
    await newWanted.save();
    res.status(201).json({ message: 'Wanted created successfully', wanted: newWanted });
} catch (err) {
    res.status(500).json({ message: 'Error creating wanted', error: err });
}
};


const getWantedById = async (req, res) => {
    try {
        const { id } = req.params;
        const wanted = await Wanted.findById(id);
        if (!wanted || !wanted._id) {
            res.status(404).json({ message: 'Wanted not found' });
        } else {
            res.status(200).json(wanted);
        }
    } catch (err) {
        res.status(500).json({ message: 'Error getting wanted', error: err });
    }
};

const getAllWanteds = async (req, res) => {
    try {
        const wanteds = await Wanted.find({}).lean().exec();
        if (!wanteds) {
            res.status(404).json({ message: 'Wanteds not found' });
        } else {
            res.status(200).json(wanteds);
        }
    } catch (err) {
        res.status(500).json({ message: 'Error getting wanteds', error: err });
    }
};


const updateWanted = async (req, res) => {
    const { id } = req.params;
    const { playlist, collection } = req.body;

    if (!playlist || !collection) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const updatedWanted = await Wanted.findByIdAndUpdate(id, { playlist, collection }, { new: true });
    if (!updatedWanted) {
        res.status(404).json({ message: 'Wanted not found' });
    } else {
        res.status(200).json({ message: 'Wanted updated successfully', wanted: updatedWanted });
    }
};

const deleteWanted = async (req, res) => {
    const { id } = req.params;
    const deletedWanted = await Wanted.findByIdAndDelete(id);
    if (!deletedWanted) {
        res.status(404).json({ message: 'Wanted not found' });
    } else {
        res.status(200).json({ message: 'Wanted deleted successfully' });
    }
};

module.exports = {
    createWanted,
    getWantedById,
    getAllWanteds,
    updateWanted,
    deleteWanted
};
