const User = require("../models/userModel.js")
const bcrypt = require("bcrypt")
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

module.exports.register = async (req, res, next) =>{
    try{
        const {username, email, password} = req.body;
        const usernameCheck = await User.findOne({username})
        if(usernameCheck){
            return res.status(400).json({msg: "Username already exists", status:false})
        }
        const emailCheck = await User.findOne({email})
        if(emailCheck){
            return res.status(400).json({msg: "User with this email already exists", status:false})
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            email, username, password: hashedPassword
        })
        return res.status(200).json({status: true})
    }catch(err){
        res.status(500).json({ status: false, msg: "Server Error" });
    }
};

module.exports.login = async (req, res, next)=>{
    const {username, password} = req.body
    try{
        const user = await User.findOne({username})
        if(!user){
            return res.json({status:false, msg: "User Not found"})
        }
        const passwordCheck = await bcrypt.compare(password, user.password)
        if(!passwordCheck){
            return res.json({status:false, msg: "Incorrect Password"})
        }
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {
            expiresIn: '1h',
        })
        return res.status(200).json({status:true, token, user:{id: user._id, username:user.username}})
    }catch(err){
        res.status(500).json({ status:false, msg: "Server Error" });
    }
};

module.exports.update = async (req, res, next) =>{
    
};

module.exports.getAllUsers = async (req, res, next) =>{

};