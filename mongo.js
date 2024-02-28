const mongoose=require("mongoose")

mongoose.set('strictQuery', false)

mongoose.connect("mongodb+srv://lonestarkingwoodacm:donthackme23!@cluster0.jdnz9i0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>{
    console.log('mongoose connected');
})
.catch((e)=>{
    console.log(e);
})

const logInSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const LogInCollection=new mongoose.model('LogInCollection',logInSchema)

module.exports=LogInCollection

