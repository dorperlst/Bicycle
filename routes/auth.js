const express = require('express')
const router = express.Router();

//routh get api/auth
//desc get logged in  user
//access private  

router.get('/',(req,res)=>{
    res.send('get logged in  user')
});

//routh post api/auth
//desc auth user & get token
//access private  

router.post('/',(req,res)=>{
    res.send('log in user')
});


module.exports = router;
