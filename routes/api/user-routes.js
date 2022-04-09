const router = require('express').Router();
const {
    getAllUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriends
} = require('../../controllers/user-controller');

// GET all and POST at /api/users
router
    .route('/')
    .get(getAllUser)
    .post(createUser);

// get one, PUT, DELETE at /api/users/:id

router  
    .route('/:userId')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);


router 
    .route('/:userId/friends/:friendId')
    .post(addFriend)
    .delete(removeFriends)


module.exports = router;