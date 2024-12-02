const jwt = require("jsonwebtoken")

const verifyToken = (req, res, next) =>{
    const authHeader = req.header('Authorization')
    if(!authHeader){
        return res.status(400).json({msg:"No token, Invalid Access"})
    }
    const token = authHeader && authHeader.split(' ')[1]
    try{
        if(token == null){
            return res.status(401).json({msg:"Invalid Access"})
        }
        jwt.verify(token, process.env.JWT_SECRET, (err, user)=>{
            if(err) return res.status(401)
            req.user = user
            next()
        });
    }catch(err){
        return res.status(500).json({msg: "Server Error"})
    }
}

module.exports = {verifyToken}
