const express = require('express')
const router = express.Router();
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
var bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const config = require('config')
const auth = require('../middlewere/auth');
const multer  = require('multer')

var storage =   multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, 'client/src/uploads');
    },
    filename: function (req, file, callback) {
      callback(null, file.originalname.substring(0,file.originalname.lastIndexOf('.')) + '-' + Date.now() + file.originalname.substring(file.originalname.lastIndexOf('.'),file.originalname.length));
    }
  });
   
  const upload = multer({
    storage: storage ,
    limits: {
        fileSize: 10000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('Please upload an image'))
        }
        cb(undefined, true)
    }
  })


router.get('/search', auth, async (req,res)=>{
    try {
        if( req.query.term === null || req.query.term === 'undefined' || req.query.term.trim() ==='' || req.query.term.length < 2  )
        {
            let result = await User.find({ _id: { $ne: req.user.id } })
            res.send(result)
            return  
        }
        let result = await User.aggregate([
            {
                '$search': {
                    'autocomplete': {
                        'query': `${req.query.term}`,
                        'path': 'name',
                        'fuzzy': {
                            'maxEdits': 2,
                            'prefixLength': 3
                        }
                    }

                }
            },
            { $match: { _id: { $ne: req.user.id } } },
        
        
        ])
        res.send(result)
        
    }
    catch (error) {
        res.status(500).send("message:" +e.message)

    }
});


router.get('/list', auth, async (req,res)=>{
    try {
        let users = await User.find()
        res.json({"users": users})

    } 
    catch (error) {
        console.log(error.message)
        res.status(500).send("server error")
    }
});

router.post('/', upload.single('myFile'), body('password').isLength(5), 
            body('name').notEmpty(), body('email').isEmail(), async (req,res)=>{
        
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {name, email, password} = req.body
    const token= ""

    try {
        let user = await User.findOne({email})
        if(user)
            return res.status(400).json({ errors: "user exist" });
        user = new User({name, email, password})
        if(req.file)
            user.image = req.file.filename

        var salt =  bcrypt.genSaltSync(10);
        user.password =  bcrypt.hashSync(password, salt);
        await user.save();
        const payload = { user:{ id: user.id } }
    
        jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 360000 }, function(err, token) {
            if(err) throw err;
            res.json({"token": token})
        });

    } 
    catch (error) {
        console.log(error.message)
        res.status(500).send(error.message)
    }
});
module.exports = router;
