const jwt = require("jsonwebtoken")

const generateAccessToken = (user) =>{
    try {
        const {_id ,username} = user
        const payload = {
            _id,
            username,
        }
        const claims = {
            "expiresIn": "15m",
        }
        const token = jwt.sign(payload, process.env.JWT_SECRET, claims)
        if (!token) throw Error;
        return token
    } catch (error) {
        throw Error(error);
    }
}

const generateRefreshJWT = (user) =>{
    try {
        const {_id,username}=user
        const payload = {
            _id,
            username,
        }
        const claims={
            "expiresIn": "30d",
        }
        const token = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, claims)
        if (!token) throw Error;
        return token
    } catch (error) {
        throw Error(error);
    }
}

module.exports = {generateAccessToken, generateRefreshJWT}