const mongoose = require('mongoose')
const User = require('./User')

const BicycleSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: User,

    },
    name:{
        type: String,
        require: true,

    },
    email:{
        type: String,
        require: true,
    },
    phone:{
        type: String,
    },
    
    type:{
        type: String,
        default: 'Personal'
    },date:{
        type: Date,
        default: Date.now,
    },
})

module.exports = mongoose.model('Bicycle', BicycleSchema)