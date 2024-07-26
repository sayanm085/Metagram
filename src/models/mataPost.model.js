import mongoose from "mongoose";



const mataPostSchema = new mongoose.Schema({
  content: {
     type: String,
      required: true 
    },
    hashtag: {
        type:Array
    },
    image: { 
        type: String, 
    },
    video: { 
        type: String, 
    },
    Attachment: {
        type: String,
    },
    likes: {
        likesNumber: {
            type: Number,
            default: 0
        },
        likedBy: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }]
    },
    comments: {
        type: Number,
        default: 0
    },
    shares: {
        type:String,
    },

    owner: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    }
},{ timestamps : true });



const mataPost = mongoose.model('mataPost', mataPostSchema);

export default mataPost;
