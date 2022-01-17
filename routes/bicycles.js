const express = require('express')
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require('../models/User')
const auth = require('../middlewere/auth');
const Bicycle = require('../models/Bicycle');

//route get api/bicycles
//desc get all user bicycles
//access private  user

router.get('/', auth, async (req,res)=>{
    try{
        const bicycles = await Bicycle.find({user: req.user.id}).sort({date:-1})
        res.json(bicycles)
    }
    catch(err){}
   
});

router.post('/', [auth, [ body('name','name is required').notEmpty()]], async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {name, email, phone, type} = req.body
 
    try{
        const newBicycle = await new Bicycle(
        {
            name, email, phone, type, user:req.user.id
        });
        const bicycle = await newBicycle.save();

        res.json(bicycle)
    }
    catch(err){
        console.error(err.message)
        res.status.send('Server Error');
    }
   
});

//route post api/bicycles
//desc add new bicycle
//access private  

// router.post('/',(req,res)=>{
//     res.send('add bicycle')
// });

//route put api/bicycles
//desc update bicycle
//access private  

router.put('/:id', auth, async (req,res)=>{
    const {name, email, phone, type} = req.body
    const bicycleFields={}
    if(name) bicycleFields.name = name
    if(email) bicycleFields.email = email
    if(phone) bicycleFields.phone = phone
    if(type) bicycleFields.type = type
try {
        let bicycle = await Bicycle.findById(req.params.id)
        if(!bicycle)
            return res.status(404).json({msg : 'bicycle not found'})
        if(bicycle.user.toString() !== req.user.id)
        {
            return res.status(401).json({msg : 'Not Autorized'})
        }
        bicycle = await Bicycle.findByIdAndUpdate(req.params.id,{$set:bicycleFields},{new:true})
        res.json(bicycle)
    } 
         catch (error) {
            console.error(err.message)
            res.status.send('Server Error');
    }
    
});

//route delete api/bicycles
//desc delete bicycle
//access private  

router.delete('/:id', auth, async (req,res)=>{
    try {
        let bicycle = await Bicycle.findById(req.params.id)
        if(!bicycle)
            return res.status(404).json({msg : 'bicycle not found'})
        if(bicycle.user.toString() !== req.user.id)
        {
            return res.status(401).json({msg : 'Not Autorized'})
        }
        bicycle = await Bicycle.findByIdAndRemove(req.params.id)
        res.json({"msg": "bicycleRemove"})
    } 
         catch (error) {
            console.error(err.message)
            res.status.send('Server Error');
    }
    })



module.exports = router;
