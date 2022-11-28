const { Thought, User } = require('../models/');

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
    }
}

module.exports = thoughtController;