const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config()

mongoose.connect(process.env.DB_CONNECT_URL,
{ useUnifiedTopology: true ,
 useNewUrlParser: true 
} , () => {
    
    console.log('Database connection Successfull')
})

const db = mongoose.connection

module.exports = db