const User = require('../models/User');
const bcrypt = require('bcrypt');

// @desc    Get all users
// @route   GET /users
// @access  Private
const getUsers = async (req, res) => {
    const users = await User.find({}).lean().exec();
    if (!users) {
        res.status(404);
        throw new Error('No users found');
    }
    res.json(users);
};

// @desc    Get user by ID
// @route   GET /users/:id
// @access  Private
const getUserById = async (req, res) => {
    const userById = await User.findById(req.params.id);
    if (userById) {
        res.json(userById);
    } else {
        res.status(404);
        throw new Error('User not found');
    }
};

// @desc    Create new user
// @route   POST /users
// @access  Private
const createNewUser = async (req, res) => {
    const { username, password, email} = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: 'All fields are required' })
    }
    const userExists = await User
        .findOne ({ username })
        .lean()
        .exec();
    if (userExists) {
        res.status(409);
        throw new Error('User already exists');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ username, password: hashedPassword, email});
    if (newUser) {
        res.status(201).json({message: 'User created successfully', user: newUser});
    }
    else {
        res.status(400);
        throw new Error('Invalid user data');
    }
};

// @desc    Update user
// @route   PATCH /users
// @access  Private
const updateUser = async (req, res) => {
    const { id, username, email, password} = req.body;

    if (!id || !username || !email) {
        return res.status(400).json({ message: 'All fields are required' })
    }
    const user = await User.findById(id).exec()
    if (!user) {
        return res.status(400).json({ message: 'User not found' })
    }
    user.username = username
    user.email = email
    if (password) {
        user.password = await bcrypt.hash(password, 10)
    }
    const updatedUser = await user.save()
    res.json({ message: `${updatedUser.username} updated` })
}

// @desc    Delete user
// @route   DELETE users/:id
// @access  Private
const deleteUser = async (req, res) => {
    const { id } = req.body || req.params;
    if (!id) {
        return res.status(400).json({ message: 'All fields are required' })
    }
    const user = await User.findById(id ).exec()
    if (!user) {
        return res.status(400).json({ message: 'User not found' })
    }
    await user.deleteOne()
    res.json({ message: `${user.username} deleted` })
};

module.exports = {
    getUsers,
    getUserById,
    createNewUser,
    updateUser,
    deleteUser
};







