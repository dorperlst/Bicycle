const express = require('express')
const connectDb= require ('./config/db')

const app=express()

connectDb()
 app.use(express.json({ extended: false}))
 var cors = require('cors')

 app.use(cors())

app.get('/',(req,res)=>res.json({msg:'welcome to bicycle keeper api'}))
app.use('/api/users', require('./routes/users'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/bicycles', require('./routes/bicycles'))

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
    });

    // app.use(function(req, res, next) {
    //     res.header("Access-Control-Allow-Origin", "*");
    //     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    //     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    //     if ('OPTIONS' == req.method) {
    //        res.sendStatus(200);
    //      }
    //      else {
    //        next();
    //      }});

 
const PORT = process.env.port || 5000
app.listen(PORT,()=>console.log(`server start on port ${PORT}`))