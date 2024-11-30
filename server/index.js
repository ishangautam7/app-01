const express= require("express")
const mongoose = require("mongoose")
const userRoutes = require("./routes/userRoutes")
const cors = require('cors');

const app = express()
require('dotenv').config();

app.use(cors())
app.use(express.json());
app.use("/api/auth", userRoutes)

const PORT = process.env.PORT || 5000

mongoose.connect(process.env.MONGO_URL, )
.then(()=>{
    console.log("Connected to Database")
}).catch((err)=>{
    console.log("Error", err.message)
})

const server = app.listen(PORT, ()=>{
    console.log(`Server is running at http://localhost:${PORT} `)
})
