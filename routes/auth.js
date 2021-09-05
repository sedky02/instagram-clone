const route = require("express").Router();
const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {registerValidation, loginValidation} = require('../validation');
const { TOKEN_SECRET } = require("../config");

route.post('/register', 
    async (req, res) => {
        //validate data
        const {error} = registerValidation(req.body);
        if(error) return res.status(400).send(error.details[0].message)

        //checking if the user exists
        const emailExist = await User.findOne({email: req.body.email});
        if(emailExist) return res.status(400).send("Email already exists");

        //hash password 
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password , salt );

        //creating new user
        const user = new User({
            name : req.body.name,
            email : req.body.email,
            password : hashedPassword
        })
      
        await user.save().then((savedUser)=>{
            res.status(200).send(savedUser._id)
        }).catch(err => console.log("error: " + err))
    })
//loginng in
route.post('/login', async(req,res)=>{
    //validate data
    const {error} = loginValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    //checking if the user exists
    const user = await User.findOne({email: req.body.email}).catch(err => console.log("ERROR : " + err));
    if ( !user ) return res.status(400).send("Email dosen't exist !");
    
    //Passord is correct ? 
    const validPass = await bcrypt.compare(req.body.password , user.password)
    if ( !validPass ) return res.status(400).send("invalid password! ");

    //creating a token 
    const token = jwt.sign({_id: user._id}, TOKEN_SECRET)
    res.header('auth-token', token).send({token: token , message : `${user.name} logged in`})
})

module.exports = route;