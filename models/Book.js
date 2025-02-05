const mongoose=require('mongoose');
const joi=require('joi');

// book Schema
const BookSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        minlength:3,
        maxlength:200,
        trim:true

    },

    author:{
        type:mongoose.Schema.Types.ObjectId, //لاننا نريد اخذها من قاعدة البيانات لذلك التايب لازم يكون اوبجيكت اي دي لان في قاعدة البيانات الاي دي عبارة عن اوبجيكت
        required:true,
        ref:'Author' // هنا نوضح للبوك سكيما من اين ياخذ الاثر اي من اي موديل ونحن نريد ان ناخذ الاثر من الاثر موديل
       
    },

   
    description:{
        type:String,
        required:true,
        trim:true,
        minlength:5
    },

    price:{
        type:Number,
        required:true,
        min:0
    },

    cover:{
        type:String,
        required:true,
        enum:['soft cover','hard cover'] // بمعنى لازم يكون الكوفر اما سوفت او هارد
    },
},{
    timestamps:true,
})


    // validate Update a Book
    function validateUpdatBook(obj){
        const schema=joi.object({
            title: joi.string().trim().min(3).max(200),
            author: joi.string(),
            description: joi.string().trim().min(5),
            price: joi.number().min(0),
            cover: joi.string().valid("soft cover", "hard cover"),

        });
        return schema.validate(obj);
    }

    // validate Craete Book
    function validateCreatBook(obj){
        const schema=joi.object({
            title: joi.string().trim().min(3).max(200).required(),
            author: joi.string().required(),
            description: joi.string().trim().min(5).required(),
            price: joi.number().min(0).required(),
            cover: joi.string().valid("soft cover", "hard cover").required(),
    
        });
        return schema.validate(obj);
    }

const Book=mongoose.model('Book',BookSchema);
module.exports={
    Book,
    validateCreatBook,
    validateUpdatBook
}