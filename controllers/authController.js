const asyncHandler = require('express-async-handler')
const { User, validateRegisterUser, validateLoginUser } = require('../models/User');
const bcrypt = require('bcryptjs');//هذه الحزمة تستخدم لاخفاء كلمة المرور في حال حصول خرق الكتروني
const jwt = require('jsonwebtoken');// استيراد التوكين


/***
    * 
    * @description Register New User
    * 
    * @route /api/register
    * 
    * @method Post
    * 
    * @access public
    */

const register = asyncHandler(async (req, res) => {
    const { error } = validateRegisterUser(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message })
    }
    let user = await User.findOne({ email: req.body.email })
    if (user) {
        return res.status(400).json({ message: `this user already registerd` })
    }
    const salt = await bcrypt.genSalt(10);// هذه الدالة()gensalt تقوم بإنشاء قيمة Salt
    // salt تقوم بانشاء سلسلة عشوائية تتم اضافتها لكلمة المرور قبل تشفيرها
    req.body.password = await bcrypt.hash(req.body.password, salt) // hash هذه الدالة تُستخدم لتشفير النص (كلمة المرور) باستخدام الـ Salt الذي تم توليده.
    //بعد تشفير كلمة المرور، يتم استبدال الكلمة الأصلية في req.body.password بالكلمة المشفرة.
    user = new User({
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,

    })

    const result = await user.save();
    // لكي لا يتم ارسال الباسوورد لليوزر
    const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET_KEY);;
    const { password, ...other } = result._doc // result._doc هو الكائن الذي يمثل بيانات المستخدم المستخرجة من قاعدة البيانات (MongoDB).
    res.status(201).json({ ...other, token })
})



/***
 * 
 * @description Login User
 * 
 * @route /api/login
 * 
 * @method Post
 * 
 * @access public
 */

const login = asyncHandler(async (req, res) => {
    const { error } = validateLoginUser(req.body);
    if (error) {
        return res.status(400).json({ message: error.details[0].message })
    }

    let user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(400).json({ message: `invalide email or password` })
    }

    // خطوة التاكد من الباسوورد
    const isPasswordMatch = await bcrypt.compare(req.body.password, user.password)// تقوم دالة الكومبير بفتح تشفير الباسورد و مقارنة الباسورد القادم من المستخد اي الباراميتر الاول مع الباسوورد الموجود في قاعدة البيانات اي الباراميتر الثاني 
    if (!isPasswordMatch) {
        return res.status(400).json({ message: `invalide email or password` })
    }
    const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET_KEY); // sign تعمل توكين جديد وتاخذ 2 باراميتر
    const { password, ...other } = user._doc
    res.status(200).json({ ...other, token })
})

module.exports = {
    register,
    login
}