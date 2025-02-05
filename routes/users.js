const express = require('express');
const router = express.Router();
const { deleteUser, getAllUsers, getUserById, updateUser } = require('../controllers/userController')
const { verifyTokenAndAuthization, verifyTokenAndAdmin } = require('../middlewares/verifyToken')


router.put('/:id', verifyTokenAndAuthization,updateUser)


router.get('/', verifyTokenAndAdmin,getAllUsers)


router.get('/:id', verifyTokenAndAuthization,getUserById)


router.delete('/:id', verifyTokenAndAuthization,deleteUser)


module.exports = router;