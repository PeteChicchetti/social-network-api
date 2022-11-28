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
            .then((thoughts) => 
                !thought
                    ? res.status(404).json({ 
                        message: 'There is no thought that matches the requested ID' 
                        })
                    : res.status(200).json(thoughts)
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
                    { new: true }
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
}

module.exports = thoughtController;