const mongoose = require('mongoose');

const user =mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    Email:{
        type:String,
        required:true
    },

    Password:{
        type:String,
        required:true
    },

    Role:{
        type:String,
        required:true
    }

   


    
})
const User = mongoose.model('User',user);

module.exports=User;