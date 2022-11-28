const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require('../../controllers/userController');

// route to /api/users
router.route('/')
    .get(getUsers).post(createUser);

// route to /api/users/:userId
router.route('/:userId')
    .get(getSingleUser).put(updateUser).delete(deleteUser);

// route to /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId')
    .post(addFriend).delete(removeFriend);

module.exports = router;
