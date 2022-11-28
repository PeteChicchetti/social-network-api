const User = require('../models/User');

const userController = {
    // Get all Users by .find()
    getUsers(req, res) {
        User.find()
        .then((users) => {
            return res.status(200).json(users);
        })
        .catch((err) => {
            return res.status(500).json(err);
        });
    },
    // Get singleUser by .findOne()
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
        // Remove version from the return
          .select('-__v')
        // Add friends and thoughts to user when returning a single user  
          .populate('friends')
          .populate('thoughts')
          .then((user) =>
            !user
              ? res.status(404).json({ message: 'There is no user that matches the requested ID' })
              : res.status(200).json(user)
          )
          .catch((err) => res.status(500).json(err));
      },
}