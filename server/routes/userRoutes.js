const express = require('express');
const router = express.Router();
const {login, register, update, getAllUsers} = require("../controller/userController")

router.get('/test', (req, res)=>{
    res.send("Hello World")
})

router.post('/login', login)
router.post('/register', register)
// router.put('/update', update)
// router.get('/getAllUsers/:Id', getAllUsers)

module.exports = router;