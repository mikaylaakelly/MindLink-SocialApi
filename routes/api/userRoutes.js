const router = require('express').Router();

const {
    //headCount,
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    terminateFriend,

} = require('../../controllers/userControllers');

//   api/users
router.route('/').get(getUsers).post(createUser);

//   api/users/:userId

router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);

//    api/users/:userId/friend/:friendId

router.route('/:userId/friends/:friendId').post(addFriend).delete(terminateFriend);

module.exports = router;
