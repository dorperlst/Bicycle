const mongoose = require('mongoose')
const User = require('./User')

const BicycleSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: User,
    },
    code:{
        type: String,
        require: true,
        unique: true
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