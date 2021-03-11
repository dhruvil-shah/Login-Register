const mongoose =require('mongoose')
mongoose.connect('mongodb://localhost:27017/login', {useNewUrlParser: true,
useUnifiedTopology:true,
useCreateIndex:true}).then(()=>{
    console.log('Successfully Connected')
}).catch((err)=>{
    console.log(err)
})