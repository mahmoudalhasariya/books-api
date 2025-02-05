const mongoose=require('mongoose');
async function connectToDb(){
    try {
       await mongoose.connect(process.env.MONGO_URI)
        console.log('Connect to Mongodb')
    } catch (error) {
        console.log(error,'Connect is Failed to Mongodb')
    }
}



module.exports=connectToDb;

// mongoose.connect(process.env.MONGO_URI) // الاتصال مع قاعدة البيانات يرجع كائن بروميس لذلك استخدمنا ذين و ايرور
       // .then(()=>console.log('Connected to MongoDB'))
      //  .catch((error)=>console.log(error,'Connection Failed to MongoDB'));
