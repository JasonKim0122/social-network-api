const router = require('express').Router();

const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addToFriends,
    removeFromFriends,
    getUserById
} = require('../../controllers/user-controller');

//GET and POST routes
router
.route('/')
.get(getAllUsers)
.post(createUser);

//GET/PUT/DELETE route for a single ID
router
.route('/:id')
.get(getUserById)
.put(updateUser)
.delete(deleteUser);

router
.route('/:userId/friends/:friendId')
.post(addToFriends);

router
.route('/:userId/friends/:friendId')
.delete(removeFromFriends);

module.exports = router;