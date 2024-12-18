const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({
    postedBy: {
        type: String,
        required: true,
        trim:true
    },
    caption: {
        type: String,
        required: false,
        trim:true,
        max: 2200
    },
    media: {
        type:String ,
        required: true,
    },
    likes : {
        type: [],
        default: []
    }
}, {timestamps: true} // this is gonna make created - modified at automatically
)
const Post = mongoose.model('Post', postSchema);
module.exports = Post;