const jwt = require("jsonwebtoken")

const verifyToken = (req, res, next) =>{
    const token = req.header('Authorization')
    if(!token){
        return res.status(400).json({mag:"No token, Invalid Access"})
    }
    try{
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decodedToken.id
        next()
    }catch(err){
        return res.status(500).json({msg: "Server Error"})
    }
}