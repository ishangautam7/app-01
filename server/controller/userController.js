const User = require("../models/userModel.js")
const Token = require("../models/Token.js")
const bcrypt = require("bcrypt")
const {generateAccessToken, generateRefreshJWT} = require("../controller/generateToken.js");

module.exports.register = async (req, res, next) =>{
    try{
        const {username, email, password} = req.body;
        const usernameCheck = await User.findOne({username})
        if(usernameCheck){
            return res.json({msg: "Username already exists", status:false})
        }
        const emailCheck = await User.findOne({email})
        if(emailCheck){
            return res.json({msg: "User with this email already exists", status:false})
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            email, username, password: hashedPassword
        })
        return res.json({status: true, msg:"User created successfully"})
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
        console.log(user)
        const accessToken = generateAccessToken(user)
        const refreshToken = generateRefreshJWT(user)
        
        const existingToken = await Token.findOne({ _userId: user._id })
        if(!existingToken){
            const newToken = new Token({_userId:user._id, refreshToken})
            await newToken.save()
            console.log("New token saved")
        }else{
            await Token.updateOne({_userId:user._id}, {
                $push: {refreshToken}
            })
        }

        return res.status(200).cookie("refreshToken", refreshToken, {
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 30 * 1000
        })
        .json({status:true, accessToken, user:{id: user._id, username:user.username}})
    }catch(err){
        console.error(err);
        res.status(500).json({ status:false, msg: "Server Error" });
    }
};

module.exports.verifyPassword = async (req, res, next) => {
    try{
        console.log(req.body)
        const {password, id} = req.body;

        const user = await User.findById(id)
        console.log(user)
        const passwordCheck = await bcrypt.compare(password, user.password)

        if(passwordCheck){
            return res.status(200).json({status: true, msg:"Password Matched"})
        }else{
            return res.json({status:false, msg:"Unable to verify"})
        }
    }catch(err){
        next(err)
    }
}

module.exports.allData = async (req, res, next) =>{
    try{
        const {id} = req.body;
        const user =await User.findById(id)
        const userObj = user.toObject()
        delete userObj.password
        console.log(userObj)
        return res.json({status:true, user:userObj})
    }catch(err){
        next(err)
    }
}

module.exports.update = async (req, res, next) =>{
    try{
        const {id, username, email, password} = req.body;
        const user = await User.findById(id)
        console.log(user)
        if(user.username !== username){
            const usernameCheck = await User.findOne({username})
            if(usernameCheck){
                return res.status(400).json({status:false, msg:"Username already exists"})
            }
        }
        if(user.email !== email){
            const emailCheck = await User.findOne({email})
            if(emailCheck){
                return res.status(400).json({status:false, msg:"Email already exists"})
            }
        }
        user.username = username || user.username
        user.email = email || user.email
        if(password){
            const hashedPassword = await bcrypt.hash(password, 10);
            user.password = hashedPassword
        }
        await user.save()
        return res.status(200).json({status:true, msg:"User updated successfully"})
    }catch(err){
        next(err)
    }
};

module.exports.getAllUsers = async (req, res, next) =>{

};