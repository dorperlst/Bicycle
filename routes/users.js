const express = require('express')
const router = express.Router();

//routh post api/users
//desc register user
//access public  user

router.post('/',(req,res)=>{
    res.send('register a user')
});
module.exports = router;
