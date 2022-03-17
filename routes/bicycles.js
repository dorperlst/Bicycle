const express = require('express')
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require('../models/User')
const auth = require('../middlewere/auth');
const Bicycle = require('../models/Bicycle');
 

router.get('/list', async (req,res)=>{
    try {
        // const bicycles = await Bicycle.find().sort({date:-1})
        const bicycles = await Bicycle.find().limit(10)    .populate('user')
       .exec(function (err, bicycles) {
           //console.log(docs[0].branch.name);
            if(err)
                res.status(500).send(err)
            else
                res.json(bicycles)

       });


    } 
    catch (error) {
        console.log(error.message)
        res.status(500).send("server error")
    }
});


router.get('/', auth, async (req,res)=>{
    try{
        const bicycles = await Bicycle.find({user: req.user.id}).sort({date:-1})
        res.json(bicycles)
    }
    catch(err){}
   
});

 
router.post('/', [auth, [ body('code','code is required').notEmpty()]], async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {code} = req.body
 
    try{
        const newBicycle = await new Bicycle(
        {
            code, user:req.user.id
        });
        const bicycle = await newBicycle.save();

        res.json(bicycle)
    }
    catch(err){
        console.error(err.message)
        res.status.send('Server Error');
    }
   
});

router.get('/changeOwner/:id', async (req,res)=>{
    const {userId} = req.body
    const bicycleFields={}
    bicycleFields.userId = userId
     
    try {
   
            return res.status(401).json({id : req.params.id})
        
    } 
    catch (error) {
        console.error(err.message)
        res.status.send('Server Error');
    }
    
});

router.post('/changeOwner/:id', auth,  async (req,res)=>{
    const {userId} = req.body
    const bicycleFields={}
    bicycleFields.user = userId
     
    try {
        let bicycle = await Bicycle.findById(req.params.id)
        if(!bicycle)
            return res.status(404).json({msg : 'bicycle not found'})
        if(bicycle.user.toString() !== req.user.id)
        {
            return res.status(401).json({msg : 'Not Autorized'})
        }
        bicycle = await Bicycle.findByIdAndUpdate(req.params.id,{$set:bicycleFields},{new:true})
        
        res.json(bicycle._id)
    } 
    catch (error) {
        console.error(err.message)
        res.status.send('Server Error');
    }
    
});
 
router.put('/:id', auth, async (req,res)=>{
    const { code} = req.body
    const bicycleFields={}
    bicycleFields.code = code
     
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
