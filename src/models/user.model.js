import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    fastname: {
        type: String,
        required: true,
        trim: true
    },
    
    lastname: {
        type: String,
        required: true,
        trim: true
    },
    username: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    gander: {
        type: String,
        required: true,
        trim: true
    },
    
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    profilePicture: {
        default: "Default_pfp.jpg",
         type: String 
        }, // URL or file path
    profilebanner: {
        default: "pexels-photo-813870.webp",
        type: String
        },
    about: { 
        default: "Hey there! I am using MataBook",
        type: String, 
        maxLength: 255 
    }, // Short bio
    followers: [{
        default: [0],
         type: mongoose.Schema.Types.ObjectId,
         ref: 'User' 
        }], // References to other users
    following: [{ 
        default: [0],
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' 
    }], // References to other users
    posts: [{ 
        default: [0],
        type: mongoose.Schema.Types.ObjectId,
        ref: 'mataPost' 
    }], // References to posts
    Location: {
        default: "India",
        type: String,
        trim: true
    },
    about: { 
        type: String, 
        maxLength: 255 
    }, // Short bio
    contact: {
        type: String,
        trim: true,
    },
    joinedAt: { 
        type: Date, 
        default: Date.now 
    }
});

userSchema.pre("save", async function (next){ // encrypt password before saving
    if(this.isModified("password")){
        this.password= await bcrypt.hash(this.password, 10);
    }
    next();
} )

userSchema.methods.verifyPassword= async function(password){ // Verify Password
    return await bcrypt.compare(password, this.password);
}



const User = mongoose.model("User", userSchema);

export default User;