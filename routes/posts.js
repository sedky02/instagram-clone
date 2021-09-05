const route = require("express").Router();
const verify = require("./verifyToken");

route.get("/",verify, async (req, res) =>{
   
    res.json({
        posts: {
            title : "my first post",
            description : "random description"
        }
    })
})

module.exports = route ; 