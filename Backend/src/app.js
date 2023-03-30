

const express = require('express');
const mongoose = require('mongoose');
var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
const User = require('./models/user_model');
const Product = require('./models/product_model');

const app = express();
const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions))
app.use(express.json());
const Secret_KEY="NOTESAPI"
const uri="mongodb+srv://osama:123@mernprojectcluster.hwffsui.mongodb.net/?retryWrites=true&w=majority"
async function connectDB() {
    try{
        await mongoose.connect(uri);
        console.log("Connected to MongoDB");
    }
    catch(err){
        console.log(err);
    }
}


connectDB()
app.listen(8000,()=>{

    console.log("Server is running on port 8000");
}
)


app.post('/Signup', async(req,res)=>{
   

    const {name,email,password,role} = req.body;
    const validateEmail = (email) => {
      const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    };
    if(!validateEmail(email)){
        return res.status(400).json({message:"Invalid Email"});
    }
    if(password.length<6){
        return res.status(400).json({message:"Password must be atleast 6 characters long"});
    }
    if(password.length>20){
        return res.status(400).json({message:"Password must be less than 20 characters long"});
    }
  

    else{
      try{
        const existingUser = await User.findOne({Email:email});
        console.log(existingUser);
    
        if(existingUser){
             return res.status(400).json({message:"User already exists"});
      }
       const hashedPassword = await bcrypt.hash(password,10);
    
       const result = await User.create({username:name, Email:email,Password:hashedPassword,Role:role});
      
    
       const  token = jwt.sign({_id:result._id},Secret_KEY)  
       res.status(201).json({user:result,token});
    
    
    
      }
      catch(err){
     
        console.log(err);
        res.status(500).json({message:err.message});
      }
    }

 


})


app.post('/Login', async(req,res)=>{
    const {email,password} = req.body;
  


    try{
      const existingUser = await User.findOne({Email:email});
      console.log(existingUser);
  
      if(!existingUser){
           return res.status(400).json({message:"User not found"});
    }
     const Match_password = await bcrypt.compare(password,existingUser.Password);
         
     if(!Match_password){
        return res.status(400).json({message:"Invalid Credentials"});

        
     }
  
     console.log(existingUser.Email,existingUser._id)
  
    const token=jwt.sign({email:existingUser.Email,id:existingUser._id},Secret_KEY)  
    
     res.status(201).json({user:existingUser, token:token});
    }
    catch(err){
   
      console.log(err);
      res.status(500).json("Something went wrong");
    }
     

})



app.post('/addProduct', async(req,res)=>{


  const{Product_name,Product_price,Product_Quantity} = req.body;

  if(Product_price<0){
    return res.status(400).json({message:"Price cannot be negative"});
  }

  if(Product_Quantity<0){
    return res.status(400).json({message:"Quantity cannot be negative"});
  }
  try{
    const result = await Product.create({Product_Name:Product_name,Price:Product_price, Quantity:Product_Quantity});
    res.status(201).json(result);
  }
  catch{
    res.status(500).json("Something went wrong");
  }
})

app.get('/getProducts', async(req,res)=>{

  Product.find((err,val)=>{
if(err){
  console.log(err);
}
else{
  res.status(200).json(val);
}
  })
})


app.post('/DeleteProduct', async(req,res)=>{

  Product.deleteOne({_id:req.body._id},(err,val)=>{
    if(err){
      console.log(err);
    }
    else{
      res.status(200).json(val);
    }
  })
}
)

app.post('/UpdateProduct', async(req,res)=>{
  const{Product_name,Product_price,Product_Quantity} = req.body;
  console.log( Product_name,Product_price,Product_Quantity);

  if(Product_price<0){
    return res.status(400).json({message:"Price cannot be negative"});
  }
  if(Product_Quantity<0){
    return res.status(400).json({message:"Quantity cannot be negative"});
  }
  try{
    const result = await Product.updateOne({_id:req.body._id},{Product_Name:Product_name,Price:Product_price, Quantity:Product_Quantity});
    res.status(201).json(result);
  }
  catch(err) {
    console.log(err);
  }
})


app.get('/getUsers', async(req,res)=>{

  User.find((err,val)=>{
if(err){
  console.log(err);
}
else{
  res.status(200).json(val);
}
  })
})

app.post("/changeRole", async(req,res)=>{
  

  const{role} = req.body;
  if(role!="Admin" && role!="User"){
    res.status(400).json({message:"Invalid Role"});
  }


else{

  try{
    const result = await User.updateOne({_id:req.body._id},{Role:role});
    res.status(201).json(result);
  }
  catch(err){
    console.log(err);
  }
}
  
})