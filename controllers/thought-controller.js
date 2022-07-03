const { User, Thought } = require('../models');

const thoughtController = {
    //to find all the thoughts
    getAllThoughts (req, res) {
        Thought.find({})
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        }); 
    },

    //find one thought by id
    getThoughtById ({ params }, res) {
        Thought.findOne({ _id: params.thoughtId })
        .select('-__v')
        .sort({ _id: -1 })
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'There was no thought found with this ID.' });
                return;
            }

            res.json(dbThoughtData)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    //creating a thought
    createThought ({ body }, res) {
        Thought.create(body)
        .then((ThoughtData) => {
            return User.findOneAndUpdate(
                {
                    _id: body.userId
                },
                {
                    $addToSet: {
                        thoughts: ThoughtData._id
                    }
                },
                {
                    new: true
                }
            );
        })
        .then(dbUsersData => {
            if (!dbUsersData) {
                res.status(404).json({message: 'There was no user found with this ID' });
                return;
            }

            res.json(dbUsersData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    //Updating a thought by looking for ID
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({
            _id: params.thoughtId
        },
        {
            $set: body
        },
        {
            runValidators: true,
            new: true
        })
        .then(updatedThought => {
            if (!updatedThought) {
                res.status(404).json({ message: 'There was no Thought found with that ID' });
                return;
            }

            return res.json({ message: 'Success!' });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    //deleting a thought
    removeThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.thoughtId })
        .then(deletedThought => {
            if (!deletedThought) {
                res.status(404).json({ message: 'There is no thought with this ID' });
                return;
            }

            return User.findOneAndUpdate({
                _id: params.thoughtId
            },
            {
                $pull: {
                    thoughts: params.thoughtId
                }
            },
            {
                new: true
            });
        })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'There was no thought found with this is'});
                return;
            }

            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    //creating reactions
    addReactions({ params, body }, res) {
        Thought.findOneAndUpdate({
            _id: params.thoughtId
        },
        {
            $push: {
                reactions: body
            }
        },
        {
            new: true,
            runValidators: true
        })
        .then(updatedThought => {
            if (!updatedThought) {
                res.status(404).json({ message: 'There was no reaction found for this ID' });
                return;
            }

            res.json(updatedThought);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    //removing the reactions
    removeReactions({ params }, res) {
        Thought.findOneAndUpdate({
            _id: params.thoughtId
        },
        {
            $pull : {
                reactions: {
                    reactionId: params.reactionId
                }
            }
        },
        {
            new: true
        })
        .then((thought) => {
            if (!thought) {
                res.status(404).json({ message: 'There was no reaction found with this ID' });
                return;
            }

            res.json(thought);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    }
};

module.exports = thoughtController;