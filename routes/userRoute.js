const express = require('express');
const router = express.Router();
const usersControllers = require('../controllers/usersControllers');
const verifyJWT = require('../middleware/verifyJWT');

router.route('/').post(usersControllers.createNewUser)

router.use(verifyJWT);
router.route('/')
.get(usersControllers.getUsers)

//! Todo - add update and delete user routes and controllers by the id
// .put(usersControllers.updateUser)
// .delete(usersControllers.deleteUser)

router.route('/:id').get(usersControllers.getUserById)
module.exports = router;