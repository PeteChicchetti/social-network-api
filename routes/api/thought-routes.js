const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
} = require('../../controllers/thoughtController');

// route to /api/thoughts
router.route('/')
  .get(getThoughts).post(createThought);

// route to /api/thoughts/:thoughtId
router.route('/:thoughtId')
  .get(getSingleThought).put(updateThought).delete(deleteThought);

// route to /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions')
  .post(addReaction);

// route to /api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId')
  .delete(removeReaction);

module.exports = router;