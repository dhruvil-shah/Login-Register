const mongoose=require('mongoose')
const schema= new mongoose.Schema(
    {
        UserName:
        {type:String},
        email:{type:String,
        unique:true},
        password:{type:String},
        repassword:{type:String}
    }
)

const model=new mongoose.model('Register',schema)
module.exports=model