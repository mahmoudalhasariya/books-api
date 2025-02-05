const joi=require('joi');
const mongoose=require('mongoose');
const AuthorSchema=mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim:true,
        maxlength:200,
        minlength:3,
        
    },

    lastName:{
        type:String,
        required:true,
        trim:true,
        maxlength:200,
        minlength:3,
        
    },

    age:{
        type:Number,
        required:true,
        minlength:0
    },
    nationality: {
       type:String,
       required:true,
       minlength:3,
       maxlength:100,
       trim:true
   },

    image:{
        type:String,
       default:'No Image',
    }
    
},{
    timestamps:true, // يعطي تاريخ انشاء و يعطي تاريخ للابديت

}
);


function validateCreateAuthor(obj){
    const schema=joi.object({
        firstName:joi.string().trim().max(200).min(3).required(),
        lastName:joi.string().trim().max(200).min(3).required(),
        age:joi.number().min(0).required(),
        nationality:joi.string().trim().required().min(3).max(100),
        image:joi.string(),
    });
    return schema.validate(obj);

}

function validateUpdateAuthor(obj){
    const schema=joi.object({
        firstName:joi.string().trim().min(3).max(200),
        lastName:joi.string().trim().min(3).max(200),
        age:joi.number().min(0),
        nationality:joi.string().trim().min(3).max(100),
        image:joi.string(),
    })
    return schema.validate(obj);

}
const Author=mongoose.model('Author',AuthorSchema);
module.exports={
    Author,
    validateCreateAuthor,
    validateUpdateAuthor
}