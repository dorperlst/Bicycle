const express = require('express')
const connectDb = require ('./config/db')
const path = require ('path')
const app = express()
connectDb()

app.use(express.json({ extended: false}))
var cors = require('cors')
app.use(cors({credentials: true, origin: true}))
app.use('/api/users', require('./routes/users'))
app.use('/api/auth', require('./routes/auth'))
app.use('/api/bicycles', require('./routes/bicycles'))
 
if(process.env.NODE_ENV === 'production')
{
    app.use(express.static("client/build"))
    app.get('*',(req,res)=>      res.sendFile(path.join(__dirname + '/client/build/index.html')));
 }

const PORT = process.env.PORT || 5000
app.listen(PORT,()=>console.log(`server start on port ${PORT}`))