const mongoose=require("mongoose")

mongoose.set('strictQuery', false)

mongoose.connect("mongodb+srv://************@cluster0.jdnz9i0.mongodb.net/writeup")
.then(() => {
    console.log('mongoose connected');
})
.catch((e) => {
    console.log(e);
})

const logInSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const LogInCollection = new mongoose.model('user-signups', logInSchema)

module.exports=LogInCollection

