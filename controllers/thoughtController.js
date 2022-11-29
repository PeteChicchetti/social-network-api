const { Thought, User } = require('../models/')

const thoughtController = {
    // Get all thoughts by .find()
    getThoughts(req, res) {
        Thought.find()
            .then((thoughts) =>
                res.status(200).json(thoughts))
            .catch((err) => 
                res.status(500).json(err));   
    },
    // Get singleThought by .findOne()
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
        // Remove version from the return
            .select('-__v')
            .then((thought) => 
                !thought
                    ? res.status(404).json({ 
                        message: 'There is no thought that matches the requested ID' 
                        })
                    : res.status(200).json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
    // Post to create a new thought
    createThought(req, res) {
        // Create new thought then find and assign to user by id
        Thought.create(req.body)
            .then((thought) => {
                return User.findOneAndUpdate(
                    { _id: req.body.userId },
                    { $addToSet: { thoughts: thought._id}},
                    { new: true },
                )
            })
            .then((user) =>
                !user
                    ? res.status(404).json({ 
                        message: 'Thought created but there is no user that matches the requested ID' 
                    })
                    : res.status(200).json('Added thought to user')
            )     
            .catch((err) => res.status(500).json(err));
    },
    // Put to update a thought
    updateThought(req, res) {
        // Properties to update a single thought
        Thought.findOneAndUpdate(
            { _id: req.body.userId },
            { $addToSet: { thoughts: thought._id}},
            { runValidators: true, new: true },
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ 
                        message: 'There is no thought that matches the requested ID' 
                    })
                    : res.status(200).json(thought)
            )     
            .catch((err) => res.status(500).json(err));
    },
    // Delete to delete a thought
    deleteThought(req, res) {
        // Delete a single thought by id
        Thought.findOneAndRemove(
            { _id: req.params.thoughtId}
        )
        .then((thought) => 
            !thought
                ? res.status(404).json({ 
                    message: 'There is no thought that matches the requested ID' 
                })
                : User.findOneAndUpdate(
                    { thoughts: req.params.thoughtId },
                    { $pull: { thoughts: req.params.thoughtId } },
                    { new: true },
                )
        )
        .then((user) => 
            !user
                ? res.status(404).json({
                    message: 'Thought deleted but there is no user that matches the requested ID'
                })
                : res.json(200).json({ 
                    message: 'The thought had been deleted!' 
                })
        )     
        .catch((err) => res.status(500).json(err));
    },
    // Post route to add a reaction to a thought
    addReaction(req, res) {
        // Put to a thought with a reaction
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body }},
            { runValidators: true, new: true},
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ 
                        message: 'There is no thought that matches the requested ID' 
                    })
                    : res.status(200).json(thought)
            )     
            .catch((err) => res.status(500).json(err));
    },
    // Delete route to remove a reaction from a thought
    removeReaction(req, res) {
        // Put to update thought
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { reactionId: req.params.reactionId }}},
            { runValidators: true, new: true},
        )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ 
                        message: 'There is no thought that matches the requested ID' 
                    })
                    : res.status(200).json(thought)
            )     
            .catch((err) => res.status(500).json(err));
    }
}

module.exports = thoughtController;