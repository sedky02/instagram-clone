const route = require("express").Router();
const Post = require("../model/Post");
const verify = require("./verifyToken");

const { postValidation } = require("../validation");

route.get("/",verify, async (req, res) =>{
   Post.find()
   .then(result => {
        res.status(200).send({posts : result , message: "" ,status:"success"})
    })
   .catch(err => res.status(404).send({message : `No posts found`, status:"error"}))
});
route.get("/:id",verify, async (req, res) =>{
    const id = req.params.id
    console.log(id)
   Post.findById(id)
   .then(result => {
        res.status(200).send({post : result , message: "" ,status:"success"})
    })
   .catch(err => res.status(404).send({message : `No posts found`, status:"error"}))
});

route.post('/upload',verify, async(req,res)=>{
//validate data
    const {error} = postValidation(req.body);
    if(error) return res.send({message : error.details[0].message , status:"error"})
    const post = new Post({
        postedBy: req.body.postedBy,
        caption: req.body.caption,
        media: req.body.media,
    })
    post.save()
    .then((savedPost)=>{
        res.status(201).send({message : `Post uploaded successfully!`, status:"success"})
    }).catch(err =>res.send({message:err, status:"error"}))
})
route.delete('/delete',verify,async(req,res, )=>{
    const id = req.body.id
    console.log(id)
    if (!id || id === 'undefined') return res.status(400).send({messaage:'no image id', status:"error"});
    Post.deleteOne({_id: id}, function(err,docs){
        if (err){
            res.status(400).send({message:err , status: "error"})
        } else {
            res.status(200).send({message:docs , status: "success"})
        }
    })
})
route.put('/update/likes', verify , async(req,res) =>{
    const id = await req.body.id;
    const likedBy = await req.body.likedBy;
    const post = await Post.findById(id);
    let isLiked = false
    for (let like of post.likes ) {
        if (like === likedBy) {
            isLiked = true
        }
    }
    if (isLiked){
        Post.updateOne(
            {_id : id},
            { likes : post.likes.filter(like => like != likedBy)},
            function(err, result) {
                if (err) {
                    res.status(400).send({message:err,status:"error"});
                } else {
                    res.status(200).send({message:result , status:"success" });
                }
              }
        )
    } else {
        Post.updateOne(
            {_id : id},
            { likes : [...post.likes, likedBy]},
            function(err, result) {
                if (err) {
                    res.status(400).send({message:err,status:"error"});
                } else {
                    res.status(200).send({message:result , status:"success"});
                }
              }
        )
    }
    
})
module.exports = route ; 