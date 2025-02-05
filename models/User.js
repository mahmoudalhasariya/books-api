const mongoose=require('mongoose');
const joi=require('joi');
const passwordComplexity=require('joi-password-complexity')
// User Schema

const UserSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        trim:true,
        minlength:5,
        maxlength:100,
        unique:true
    },

    username:{
        type:String,
        required:true,
        trim:true,
        minlength:2,
        maxlength:200,
    },

    password:{
        type:String,
        required:true,
        trim:true,
        minlength:8,
        
    },

    isAdmin:{
        type:Boolean,
        default:false
    },
},{timestamps:true})

//User Model
const User=mongoose.model('User',UserSchema);

// Validate Register Functions

function validateRegisterUser(obj){

    const schema=joi.object({
        email:joi.string().trim().min(5).max(100).required().email(),
        username:joi.string().trim().max(200).min(2).required(),
        password:passwordComplexity().required()
      
        
    })

    return schema.validate(obj)
}

// Validate Login Functions


function validateLoginUser(obj){

    const schema=joi.object({
        email:joi.string().trim().min(5).max(100).required().email(),
        password:joi.string().trim().min(5).required(),
        
    })

    return schema.validate(obj)
}


// Validate Change Password

function validateChangePassword(obj){

    const schema=joi.object({
      
        password:joi.string().trim().min(5).required(),
        
    })

    return schema.validate(obj)
}


// Validate Update Functions


function validateUpdateUser(obj){

    const schema=joi.object({
        email:joi.string().trim().min(5).max(100).email(),
        username:joi.string().trim().max(200).min(2),
        password:joi.string().trim().min(5),
        
        
    })

    return schema.validate(obj)
}
module.exports={
    User,
    validateLoginUser,
    validateRegisterUser,
    validateUpdateUser,
    validateChangePassword
}