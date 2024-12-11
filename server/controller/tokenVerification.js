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
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded
        next()
    }catch(err){
        return res.status(500).json({msg: "Server Error"})
    }
}

module.exports = {verifyToken}
