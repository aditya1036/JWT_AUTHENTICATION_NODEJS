const JOI = require('@hapi/joi')



const registerValidation = (data) => {

    const schema = JOI.object({
        username:JOI.string().min(6).required(),
        email:JOI.string().min(6).required().email(),
        password:JOI.string().min(6).required()
    });

    return schema.validate(data)
}

const loginValidation = (data) => {

    const Schema = JOI.object({

        email: JOI.string().min(6).required().email(),
        password: JOI.string().min(6).required()
    
    })

    return Schema.validate(data)
}


module.exports = {registerValidation , loginValidation}