const asyncHandler = require('express-async-handler')
const { User,validateChangePassword } = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const nodemailer=require('nodemailer')
/**
 * @desc Get Forgot Password Viwe
 * @router /password/forgot-password
 * @method  GET
 * @access public
 * 
 * 
 * **/

module.exports.getForgotPasswordViwe = asyncHandler((req, res) => {
   res.render('forgot-password')

})

/**
 * @desc SEnd forgot password link
 * @router /password/forgot-password
 * @method  post
 * @access public
 * 
 * 
 * **/

/**
 * 
 * لدالة تعمل على:
التأكد من وجود المستخدم بالبريد الإلكتروني.
إنشاء رمز JWT يحتوي على معلومات المستخدم، محمي بمفتاح سري فريد.
تكوين رابط يحتوي على الرمز والمعرّف.
إعادة الرابط كاستجابة ليتم استخدامه في إعادة تعيين كلمة المرور
 */



module.exports.sendForgotPasswordLink = asyncHandler(async (req, res) => {
   const user = await User.findOne({ email: req.body.email });
   if (!user) {
      return res.status(404).json({ message: 'User is not found' });
   }

   const secret = process.env.JWT_SECRET_KEY + user.password;
   const token = jwt.sign({ email: user.email, id: user._id }, secret, {
      expiresIn: '10m',
   });

   const link = `http://localhost:5000/password/reset-password/${user._id}/${token}`;
   console.log('Generated Reset Password Link:', link); // التحقق من الرابط

  const transporter=nodemailer.createTransport({
   service:'gmail',
   auth:{
      user:process.env.USER_EMAIL,
      pass:process.env.USER_PASS
   }
  })
   
  const mailOptoins={
   from:'your email',
   to:user.email,
   subject:'Reset Password',
   html:`
   <div>
   <h4> Click on the below to reset your password</h4>
   <p>${link}</p>
   </div>`
  }
  transporter.sendMail(mailOptoins,function (error,success){
   if(error){
      console.log(error)
      res.status(500).json({message:'Somthing went wrong'})
   } else{
      console.log('Email send:' + success.response)
      res.render('link-send')
   }
  })

});


/**
* @desc Get reset password link
* @router /password/reset-password/:userId/:token
* @method  GET
* @access public
* 
* 
* **/
module.exports.getResetPasswordView = asyncHandler(async (req, res) => {

   const user = await User.findById(req.params.userId);
   if (!user) {
      res.status(404).json({ message: 'user is not found in data base' })
   }
   const secret = process.env.JWT_SECRET_KEY + user.password;  // توليد مفتاح سري جديد هذا يجعل الرمز (token) فريدًا لكل مستخدم ومحصنًا بكلمة مروره.
   try {

      jwt.verify(req.params.token, secret)// للتاكد من التوكين اذا كان صالح او لا
      res.render('reset-password', { email: user.email })
   } catch (error) {
      console.log(error)
      res.json({ message: 'Error' })
   }
})

/**
* @desc Reset the password
* @router /password/reset-password/:userId/:token
* @method  POST
* @access public
* 
* 
* **/
module.exports.resetThePassword = asyncHandler(async (req, res) => {
   const {error} = validateChangePassword(req.body)
   if(error){
      return res.status(400).json({message:error.details[0].message})
   }
   const user = await User.findById(req.params.userId);
   if (!user) {
      res.status(404).json({ message: 'user is not found in data base' })
   }
   const secret = process.env.JWT_SECRET_KEY + user.password 
   try {

      jwt.verify(req.params.token, secret)
      const salt = await bcrypt.genSalt(10)
      req.body.password = await bcrypt.hash(req.body.params, salt)
      user.password = req.body.password
      await user.save()
      res.render('success-password')
   } catch (error) {
      console.log(error)
      res.json({ message: 'Error' })
   }
})

