const express = require('express')
const router = express.Router();

//routh get api/contacts
//desc get all user contacts
//access private  user

router.get('/',(req,res)=>{
    res.send('get all contacts')
});

//routh post api/contacts
//desc add new contact
//access private  

router.post('/',(req,res)=>{
    res.send('add contact')
});

module.exports = router;
