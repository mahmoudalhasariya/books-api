const express=require('express');
const { getForgotPasswordViwe, sendForgotPasswordLink, resetThePassword, getResetPasswordView } = require('../controllers/passwordController');
const router=express.Router()

// forgot password rout
router.route('/forgot-password')
.get(getForgotPasswordViwe)
.post(sendForgotPasswordLink)

// /password/reset-password/:userId/:token
router.route('/reset-password/:userId/:token')
.get(getResetPasswordView)
.post(resetThePassword)
module.exports=router;