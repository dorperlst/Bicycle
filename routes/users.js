const express = require('express')
const router = express.Router();
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
var bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const config = require('config')

//route post api/users
//desc register users
//access public  user
 
    router.post('/', body('password').isLength(5), body('name').notEmpty(), body('email').isEmail(),
         async (req,res)=>{

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const {name, email, password} = req.body
        const token= ""

        try {
            let user= await User.findOne({email})
            if(user)
                return res.status(400).json({ errors: "user exist" });
            user = new User({name, email, password})
        
            var salt =  bcrypt.genSaltSync(10);
            user.password =  bcrypt.hashSync(password, salt);
    
            var user2 = await user.save();

            const payload = {
                user:{
                    id: user.id
                }
            }
        
            jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 360000 }, function(err, token) {
                if(err) throw err;
    
                res.json({"token": token})
                
            });

    
        } catch (error) {
            console.log(error.message)
            res.status(500).send("server error")

    }

 
});
module.exports = router;
