const { User } = require('../models');

const userController = {
    //Get All Users
    getAllUsers(req,res) {
        User.find({})
        .populate({
            path: 'thoughts',
            select: ('-__v')
        })
        .select('-__v')
        .sort({ _id: -1 })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    },
    
    //Get a single User by id
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
        .populate({
            path: 'thoughts',
            select: ('-__v')
        })
        .select('-__v')
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },

    //create a user
    createUser({ body }, res) {
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(400).json(err));
    },

    //Allows for updating a user
    updateUser({ params, body}, res) {
        User.findOneAndUpdate({ _id: params.id }, body, {
            new: true,
            runValidators: true
        })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No User found with this ID!' });
                return;
            }

            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    //deleting a user
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'There is no User found with that ID' });
                return;
            }

            return dbUserData;
        })
            .then(dbUserData => {
                User.updateMany({
                    _id: {
                        $in: dbUserData.friends
                    }
                },
                {
                    $pull: {
                        friends: params.userId
                    }
                })
                .then(() => {
                    Thought.deleteMany({
                        username: dbUserData.username
                    })
                    .then(() => {
                        res.json({ message: 'The User was successfully deleted' });
                    });
                })
                .catch(err => {
                    console.log(err);
                    res.status(400).json(err);
                })
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        })
    },

    //adding friends
    addToFriends({ params }, res) {
        User.findOneAndUpdate({
            _id: params.userId
        },
        {
            $push: {
                friends: params.friendId
            }
        },
        {
            new: true
        })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'There is no User found with that ID' });
                return;
            }

            res.json(dbUserData)
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err)
        });
    },

    //remove friend
    removeFromFriends ({ params }, res) {
        User.findOneAndDelete({ _id: params.thoughtId })
        .then(deletedFriend => {
            if (!deletedFriend) {
                res.status(404).json({message: 'There was no friend found with this ID' });
                return;
            }

            return User.findOneAndUpdate({
                friends: params.friendId
            },
            {
                $pull: {
                    friends: params.friendId
                }
            },
            {
                new: true
            });
        })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({message: 'There was no friend found with this ID' });
                return;
            }

            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.json(err);
        })
    }
};

module.exports = userController;