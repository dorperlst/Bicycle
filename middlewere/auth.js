const jwt = require('jsonwebtoken')
const config = require('config')
const { model } = require('mongoose')


 const auth = async (req, res, next) => {
 const token = req.headers['authorization'];
 
    if(token == undefined)
    {
        return res.status(401).json({"msg":"no token, Authorization denied"})
    }
       
    try{
        const decoded = jwt.verify(token, config.get('jwtSecret'))
        req.user = decoded.user
        next();
    }
    catch(err){
        console.log(err)

        res.status(401).json({msg:'Token is not vaild'})
    }
 }



// model.export= function (req,res,next){
//     
// }
module.exports = auth