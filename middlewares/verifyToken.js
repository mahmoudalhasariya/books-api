const jwt =require('jsonwebtoken');
const { Model } = require('mongoose');


// هذا الميديل وير للتاكد من المستخدم الذي قام بتسجيل الدخول هو بالفعل صاحب التوكين

// verify Token
function verifyToken(req,res,next){
    const token =req.headers.token; // التوكين يكون في الهيدر
    if(token){ // اذا كان التوكين موجود 
        // اذا كان التوكين موجود يجب فتح التشفير و يجب وضعها في تراي و كاتش 
        try {
            const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY) //الفيريفاي تقوم بفتح التشفير للتوكين و تعطينا الحمولة التي تحوي على الاي دي و الاس ادمن
            req.user=decoded;
            next();
        } catch (error) {
            res.status(401).json({message:'invalid token'})
        }
        
    }else{
        res.status(401).json({message:'no token provided'}) // الرمز 401 يعني لا تملك صلاحية
    }

}

// Verify Token & Authorize the user
function verifyTokenAndAuthization(req,res,next){
  verifyToken(req,res,()=>{
    if(req.user.id === req.params.id || req.user.isAdmin){
     next()
    }else{
        return res.status(403).json({message:'you are not allowed'})
    }
  })
}

// Verify Token And Admin
function verifyTokenAndAdmin(req,res,next){
    verifyToken(req,res,()=>{
      if( req.user.isAdmin){
       next()
      }else{
          return res.status(403).json({message:'you are not allowed, only for Admin'})
      }
    })
  }
  
module.exports={
    verifyToken,
    verifyTokenAndAuthization,
    verifyTokenAndAdmin,
}