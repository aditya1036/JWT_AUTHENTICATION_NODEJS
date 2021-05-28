const express = require('express')
const cors = require('cors')
const app = express()
const db = require('./database/db')
const router = require('./routes/router')
const port = 8000 || process.env.PORT


app.use(express.json())
app.use(cors())


app.use('',router)

app.get('/' , (req,res) => {
    res.send("Express JS Running")
})

db.on('error' , console.error.bind(console, 'MongoDB connection error:'))



app.listen(port , () => {
    console.log(`Server is Up and Running on port: ${port}`)
})