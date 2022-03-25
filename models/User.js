const mongoose = require('mongoose')
const UserSchema = mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    image:{
        type:String ,
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true,
    },
    date:{
        type:Date,
        default:Date.now,
    }
})

module.exports = mongoose.model('User', UserSchema)