const express=require('express');
const app=express();
const port=process.env.PORT || 8000;
const path=require('path');

//Public 
const staticpath=path.join(__dirname,'../public')
app.use(express.static(staticpath))

//Views
const viewpath=path.join(__dirname,'../templates/views')
app.set('views',viewpath)
app.set('view engine','hbs')

//Partials
const hbs = require("hbs");
const partialPath=path.join(__dirname,'../templates/partials')
hbs.registerPartials(partialPath)

//database
const model = require('./models/registers');
require('./db/data')
app.use(express.urlencoded({extended:false}))
app.get('/',(req,res)=>{
    res.render('index')
    })
app.get('/login',(req,res)=>{
res.render('login')
})
app.get('/register',(req,res)=>{
res.render('register')
})
app.post('/register',async(req,res)=>{
    try{
     const pass=req.body.pass;
     const repass=req.body.repass;
     if(pass === repass)
     {
      const emp1=new model({
          username:req.body.username,
          email:req.body.email,
          password:pass,
          repassword:repass
      })
     const registered=await emp1.save();
     res.status(200).render('index');

     }
     else
     {
         res.send('Password Does not Match')
     }
    }
    catch(error){
    res.status(400).send(error)
    }
    })
app.post('/login',async(req,res)=>{
    try{
     const email=req.body.email
     const password=req.body.password
     const usermail =await model.findOne({email:email})
     console.log(usermail)
     if(usermail.password === password) 
     res.status(201).render('index')
     else
     {
        //  windows.alert('Password Doesnt match');
        //  document.getElementsByName('password').focus
        res.send('Password doesnt match')
        
     }
    }
    catch(error){
     res.status(400).send(error);
    }
})
app.listen(port,()=>{
    console.log('Connected Successfully')
})