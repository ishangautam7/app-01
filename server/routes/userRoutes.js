const express = require('express');
const router = express.Router();
const {login, register, update, getAllUsers, verifyPassword, allData} = require("../controller/userController")
const {verifyToken} = require('../controller/tokenVerification')

router.get('/test', (req, res)=>{
    res.send("Hello World")
})

router.post('/login', login)
router.post('/register', register)
router.post('/verifypassword',verifyToken, verifyPassword)
router.post('/alldata',verifyToken, allData)
router.put('/update',verifyToken, update)
// router.get('/getAllUsers/:Id', getAllUsers)

module.exports = router;