const express = require('express')
const controller = require('../controllers/index')

const router = express.Router()

router.post('/register' , controller.createUser)

router.post('/login' , controller.loginCheck )


router.get('/posts' , controller.auth ,(req,res) => {

    res.status(200).json({
        post: 'Welcome To NodeJS',
        message: 'My Pleasure'
    })
})

module.exports = router