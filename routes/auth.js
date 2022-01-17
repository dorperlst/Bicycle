const express = require('express')
const router = express.Router();
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const auth = require('../middlewere/auth')
var bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const config = require('config')

//route get api/auth
//desc get logged in  user
//access private  

router.get('/', auth, async (req,res)=>{
    try{
        const user = await User.findById(req.user.id)//.select('password')
        res.json(user)
    }
   catch(err){
       console.log(err.message)
       res.status(500).send('Server error');
   }
 });

//route post api/auth
//desc auth user & get token
//access private  
router.post('/',body('password'), body('email').isEmail(), async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {email, password} = req.body
    let user = await User.findOne({email:email})
    if(!user)
        return res.status(400).json({ errors: "invaild credentials" });
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch)
        return res.status(400).json({ errors: "invaild credentials" });

    const payload = {
        user:{
            id: user.id
        }
    }
    
    jwt.sign(payload, config.get('jwtSecret'),{expiresIn:360000},(err, token)=>{
        if(err) throw err;
        res.json({token})
    }  )
 });


module.exports = router;
