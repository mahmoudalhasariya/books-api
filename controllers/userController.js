const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const { User, validateUpdateUser } = require('../models/User')

/***
     * 
     * @description Update User
     * 
     * @route /api/users/:id
     * 
     * @method Put
     * 
     * @access private
     */

const updateUser = asyncHandler(async (req, res) => {
    const { error } = validateUpdateUser(req.body)
    if (error) {
        return res.status(400).json({ message: error.details[0].message })
    }
    // تشفير الباسوورد في حال قام المستخدم بتعديل الباسوورد
    if (req.body.password) {
        const salt = await bcrypt.genSalt(10);// salt هو سلسلة عشوائية تضاف لى كلمة المرور قبل تشفيرها الرقم 10 يمثل قوة تعقيد الشيفرة
        req.body.password = await bcrypt.hash(req.body.password, salt)
    }
    const updateUser = await User.findByIdAndUpdate(req.params.id, {
        $set: {
            email: req.body.email,
            password: req.body.password,
            username: req.body.username
        }
    }, { new: true }).select('-password')// لكي لا يتم ارسال الباسوورد الى المستخدم

    res.status(200).json(updateUser)
})

/***
  * 
  * @description Get All Users
  * 
  * @route /api/users/
  * 
  * @method Get
  * 
  * @access private (only Admin)
  */

const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find().select('-password')
    res.status(200).json(users);
})

/***
  * 
  * @description Get user By id
  * 
  * @route /api/user/id
  * 
  * @method Get
  * 
  * @access private (only Admin & user himself)
  */

const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select('-password');
    if (user) {
        res.status(200).json(user)
    } else {
        res.status(404).json({ message: 'user is not found' }) // يعني الراوتر غير موجود
    }
})

/***
 * 
 * @description Delete user By id
 * 
 * @route /api/user/id
 * 
 * @method Delete
 * 
 * @access private (only Admin & user himself)
 */

const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
        await User.findByIdAndDelete(req.params.id).select('-password')
        res.status(200).json({ message: 'user has been dlelted' })
    } else {
        req.status(404).json({ message: 'user not found' })
    }
})

module.exports = {
    getAllUsers,
    getUserById,
    deleteUser,
    updateUser
}