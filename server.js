//Step1 Import.. 
const express = require('express')
const app = express()
const morgan = require('morgan')
const { readdirSync } = require('fs') //To Read dir file
const cors = require('cors') //Allow Clint Server can connect

// const authRouter = require('./routes/auth')
// const categoriesRouter = require('./routes/categories')

//Middleware
app.use(morgan('combined'))
app.use(express.json()) //เพื่อให้อ่าน Body จาก Req ได้
app.use(cors())

// app.use('/api',authRouter)
// app.use('/api',categoriesRouter)

//Step2 Start server
app.listen(5000, () => console.log('Server is running on port 5000'))

//For loop into dir file to make routing
readdirSync('./routes')
    .map((c) => app.use('/api', require('./routes/' + c)))

//console.log(readdirSync('./routes'))

//Step3 Router
// app.get('/api',(req,res)=>{
//     //code
//     const { username, password }= req.body //ตั้งชื่อตัวแปรให้เหมือน requset
//     console.log(username, password) //body สิ่งที่ส่งมาจากหน้าบ้าน
//     res.send('KittiBank')

// })