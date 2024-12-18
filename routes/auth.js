const route = require("express").Router();
const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {registerValidation, loginValidation} = require('../validation');
const { TOKEN_SECRET } = require("../config");
// const redis = require("redis");
// const client = redis.createClient()
// const verify = require("./verifyToken");
route.post('/register', 
    async (req, res) => {
        //validate data
        const {error} = registerValidation(req.body);
        if(error) return res.send({message : error.details[0].message , status:"error"})
        
        //checking if the user exists
        const emailExist = await User.findOne({email: req.body.email});
        if(emailExist) return res.send({message : `email already exists`, status:"warning"});
        
        //checking if the username exists
        const usernameExist = await User.findOne({username: req.body.username});
        if(usernameExist) return res.send({message : `username already exists`, status:"warning"});

        //hash password 
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password , salt );

        //creating new user
        const user = new User({
            name : req.body.name,
            username : req.body.username,
            email : req.body.email,
            password : hashedPassword
        })
        await user.save().then((savedUser)=>{
            res.status(201).send({message : `${savedUser.name} is registred successfully!`, status:"success"})
        }).catch(err =>res.send({message:err, status:"error"}))
    })
    
//loginng in
// function cache (req, res,next) {
//     client.get("user" , (err , data) => {
//         if (err) res.send(err)

//         if (data !== null) {
//             res.send(data);
//             next()
//           } else {
//             next();
//         }
//     })
// }
route.post('/login', async(req,res)=>{
    //validate data
    const {error} = loginValidation(req.body);
    if(error) return res.send({message:error.details[0].message , status:"error"});

    //checking if the user exists
    const user = await User.findOne({email: req.body.email}).catch(err => console.log("ERROR : " + err));
    if ( !user ) return res.send({message:"Email dosen't exist !", status:"warning"});
    
    //Passord is correct ? 
    const validPass = await bcrypt.compare(req.body.password , user.password)
    if ( !validPass ) return res.send({message:"invalid password! ", status:"warning"});

    //creating a token 
    const token = jwt.sign({_id: user._id}, TOKEN_SECRET)
    //  client.setEx("user", 3600, {token: token , 
    //     message : `${user.name} logged in`, 
    //     status:"success" ,
    //     isLogged : true,
    //     user:user
    // } ).catch(err => res.status(501).send("err"))

    res.header('auth-token', token).send({token: token , 
        message : `${user.name} logged in`, 
        status:"success" ,
        isLogged : true,
        user:user
    })
})

route.get("/", async (req,res) =>{
    User.find({})
    .then(result => res.status(200).send(result))
    .catch(err => res.status(400).send(err))
})
route.get("/:id" , async (req,res) =>{
    User.findById(req.params.id)
    .then(result => res.send(result))
    .catch(err => res.status(402).send(err))
})
route.put("/:id" , async (req,res) =>{
    User.findOneAndUpdate({_id : req.params.id}, req.body)
    .then(result => res.send({message: `Updated Successfully`}))
    .catch(err => res.status(402).send(err))
})
route.delete("/:id" , async (req,res) =>{
    User.findOneAndRemove({_id : req.params.id})
    .then(result => res.status(204).send({message: `Deleted Successfully`}))
    .catch(err => res.status(402).send(err))
})

module.exports = route;