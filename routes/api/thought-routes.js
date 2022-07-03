const router = require('express').Router();

const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    removeThought,
    addReactions,
    removeReactions
} = require('../../controllers/thought-controller');

router
.route('/')
.get(getAllThoughts)
.post(createThought);

router
.route('/:thoughtId')
.get(getThoughtById)
.put(updateThought)
.delete(removeThought)

router
.route('/:thoughtId/reactions')
.post(addReactions);

router
.route('/:thoughtId/reactions/:reactionId')
.delete(removeReactions);

module.exports = router;