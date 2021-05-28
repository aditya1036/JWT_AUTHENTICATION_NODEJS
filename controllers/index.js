const User = require('../models/User')
const {registerValidation , loginValidation} = require('../validations')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')



createUser = async (req , res) => {
    const body = req.body
    if(!body)
    {
        return res.status(404).json({
            success: false,
            error: 'Error Occured',
            message: 'User Cannot be Created'
        })
    }

// Validations
    const {error} = registerValidation(body)

    if(error)
    {
        return res.status(404).send(error.details[0].message)
    }


//Email Exists
    const emaiExists = await User.findOne({email: req.body.email})

    if(emaiExists)
    {
        return res.status(404).json({
            success: false,
            message: 'Email alredy Exists'
        })
    }

//Hash Password

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(body.password , salt)



    const user = new User({username: body.username , email: body.email , password: hashPassword})

    if(!user)
        {
            return res.status(400).json({
                success: false,
                message: 'User cannot be created'
            }) 
        }
    
    await user.save()
    .then(() => {
        return res.status(200).json({
            success: true,
            id:user._id,
            message: 'User Created Successfully'
        })
    })
    .catch((err) => {
        return res.status(404).json({
            success: false,
            error: err,
            message: 'Error Occured'
        })
    })

}


loginCheck = async (req,res) => {

    const body = req.body

//Validation
    const {error} = loginValidation(body)
    if(error)
    {
        return res.status(404).send(error.details[0].message)
    }

// Email Exists

const user = await User.findOne({email: req.body.email})

    if(!user)
    {
        return res.status(404).json({
            success: false,
            message: 'Email does not exists'
        })
    }

    // Password is Correct

    const validPassword = await bcrypt.compare(body.password , user.password)

    if(!validPassword)
    {
        return res.status(400).json({
            message: 'Invalid Password'
        })
    }

// Create and assign Token
    const token = jwt.sign({_id: user.password}, process.env.TOKEN_SECRET)
    res.header('auth-token' , token)
    return res.status(200).json({ message: 'Logged in Succeffuly' , token: token})


}


auth = (req,res,next) => {
    body = req.body
    const token = req.header('auth-token')
    if(!token)
    {
        return res.status(404).json({
            message: 'Access Denied'
        })
    }

    try{

        const verified = jwt.verify(token,process.env.TOKEN_SECRET)
        req.user = verified
        next()
        
    }
    catch(err)
    {
        return res.status(400).json({
            message: 'Invalid Token'
        })
    }


}




module.exports = { createUser , loginCheck ,auth }