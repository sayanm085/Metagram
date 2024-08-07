import express, { json } from "express";
import cors from "cors";
import User from "./src/models/user.model.js";
import mataPost from "./src/models/mataPost.model.js";
import upload from "./src/middleware/multer.js";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let app = express();

app.use(cors());



app.use(express.static(path.join(__dirname, 'public')));
// Set the view engine (e.g., EJS, Pug, etc.)
app.set('view engine', 'ejs');
// Set the path to the views directory
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: false })); //using the middleware
app.use(cookieParser());
app.use(express.json());



function jwttokendecoder(token) {
    let decoded = jwt.verify(token, "secret");
    return decoded;
 }
  //API for rendering the blog page



app.get("/", (req, res)=> {
    res.redirect("/login");
});

app.get("/login",protectLogin,  (req, res) => {
    res.render("login");

}); 

app.post("/login",async (req, res) => {  //logging in the user
    const { username, password } = req.body;
    try {
        const user = await User.findOne({username});
        if (!user){
           res.redirect("/login");
        }
        else {
            const isMatch = await user.verifyPassword(password);
            if (isMatch){
                let token = jwt.sign({ username: username ,password:user.password ,id:user._id}, "secret", { expiresIn: "7D" }); 
                res.cookie("token", token);
                res.redirect("/home");
            }
            else {
                res.redirect("/login");
            }
        }

    } catch (error) {
        console.log(error);
    }
});

 


app.get("/register", protectLogin, (req, res) => {
    res.render("register");
});

app.post("/register", async (req, res) => { //registering the user
   
    const {fastname,lastname,username,gander,email, password } = req.body;
    const user = new User({ fastname, lastname, username,gander,email, password  });
    await user.save().then((i) => {


        let token = jwt.sign({ username: username,password: password,id:user._id}, "secret", { expiresIn: "1h" }); 
        res.cookie("token", token);

       console.log(i);
        res.redirect("/home");
    }).catch((err) => {
        console.log(err);
        res.send("Error in registering user");
    });  

});





app.get("/logout", (req, res) => {
    res.clearCookie("token");
    res.redirect("/login");
}); //logging out the user


app.post('/createpost', upload.single('imgvideofile'), authenticateToken ,async (req, res) => {// API for file upload
   
    let  user= await User.findOne({username:req.user.username}); //fetching the user data
    

    const {content,hashtag} = req.body;

    const blogpostdata = new mataPost({content,hashtag,image:req.file.filename,owner:user._id});

    await blogpostdata.save().then(() => {

        User.findOneAndUpdate({_id:user._id} , 
            { $push: {posts: blogpostdata._id} }, 
            { new: true }).then((i) => { 
                console.log(i);
                res.redirect("/home");
            }).catch((err) => {
                console.log(err);
                res.send("Error in uploading blog post");
            });
    

    }).catch((err) => {
        console.log(err);
        res.send("Error in uploading blog post");
    });
    
    console.log(req.file);

  });



app.post("/editprofile", upload.fields([{ name: "profilebanner", maxCount: 1 }, { name: "profilePicture", maxCount: 1 }]), authenticateToken, async (req,res) => {

    const { profilebanner, profilePicture} = req.files;
    const { fastname, lastname, username, about,contact,location, website } = req.body;
    const userId = req.user.id;

    try {
        const user = await User.findById (userId);
        if (!user) {
            return res.status(404).send({ error: "User not found" });
        }
        if (profilebanner) {
            user.profilebanner = profilebanner[0].filename;
        }
        if (profilePicture) {
            user.profilePicture = profilePicture[0].filename;
        }
        user.fastname = fastname;
        user.lastname = lastname;
        user.username = username;
        user.about = about;
        user.contact = contact;
        user.Location = location;
        user.website = website;

        await user.save();
        res.redirect("/profile/"+user._id);
    } catch (error) {
        console.error("Error editing profile:", error);
        res.status(500).send({ error: "Internal server error" });
    }
});

app.get("/editpost/:postId", authenticateToken, async (req, res) => {

});
  
app.get("/like/:postId", authenticateToken, async (req, res) => {
    const postId = req.params.postId; //fetching the post id

    let user= await User.findOne({username:req.user.username}); //fetching the user data
    let post = await mataPost.findById(postId); //fetching the post data
    let likes = post.likes.likesNumber; //fetching the likes number
    let likedBy = post.likes.likedBy; //fetching the liked by array
    let index = likedBy.indexOf(user._id); //checking if the user has already liked the post
    if (index === -1) { //if the user has not liked the post
        likes++;
        likedBy.push(user._id);
    } else {//if the user has liked the post
        likes--;
        likedBy.splice(index, 1);
    }
    await mataPost.findByIdAndUpdate (postId, { "likes.likesNumber": likes, "likes.likedBy": likedBy }, { new: true }).then((i) => { //updating the likes number and liked by array
        res.send([i.likes ,req.user.id]);
    }).catch((err) => {
        console.log(err);
        res.send("Error in liking post");
    }); 
    
});



app.get("/follow/:postId", authenticateToken, async (req, res) => {
    const following = req.params.postId; //fetching the post id

    let user= await User.findOne({username:req.user.username}); //fetching the user data
    let followinguser = await User.findById(following); //fetching the following user data
    let userfollowing = user.following.followingNumber; //fetching the following number
    let followingBy = user.following.followingBy; //fetching the following by array
    let followers = followinguser.followers.followerNumber; //fetching the followers number
    let followerBy = followinguser.followers.followerBy; //fetching the follower by array
    let index = followerBy.indexOf(user._id); //checking if the user has already followed the user
    if (index === -1) { //if the user has not followed the user
        userfollowing++;
        followers++;
        followingBy.push(following);
        followerBy.push(user._id);
    } else {//if the user has followed the user
        userfollowing--;
        followers--;
        followingBy.splice(index, 1);
        followerBy.splice(index, 1);
    }


    await User.findByIdAndUpdate (following, { "followers.followerNumber": followers, "followers.followerBy": followerBy }, { new: true }).then((i) => { //updating the followers number and follower by array
        res.send({followers: i.followers, following: i.following , user:user._id});
    }).catch((err) => {
      console.log(err);
      res.send("Error in following user");
  }
  );

    await User.findByIdAndUpdate (user._id, { "following.followingNumber": userfollowing, "following.followingBy": followingBy }, { new: true }).then((i) => { //updating the following number and following by array
     
    }
    ).catch((err) => {
        console.log(err);
        res.send("Error in following user");
    });

   

   
});




app.get("/allposts",authenticateToken,async (req, res) => {
   let loggedinuser= req.user.id;
    let allposts = await mataPost.find()
    .populate("owner")
    res.send([allposts,loggedinuser]);

}); //API for fetching all blog posts


app.get("/loginuser",authenticateToken,async (req, res) => {
    let user= await User.findOne({username:req.user.username}).populate("posts").populate("followers").populate("following");
    res.send(user);
});

app.get("/home",authenticateToken,(req, res) => {
   
    res.render("mainpage");

}); //API for fetching all blog posts

app.get("/profile",authenticateToken,async (req, res) => {
    res.render("own.profile.ejs");
});
app.get("/profile/:userId", authenticateToken, async (req, res) => {
    const userId = req.params.userId; //fetching the User id
    const loginuser= req.user.id;
     
    if(userId==loginuser){
        res.render("own.profile.ejs");
    }
    else{
        let user= userId;
        res.render("user.profile.ejs",{user});
    }

   console.log(loginuser);
});



app.get("/userprofile/:userId", authenticateToken, async (req, res) => {
    const userId = req.params.userId;

    try {
        const userdata = await User.findById(userId)
            .select("-password -email") 
            .populate("posts", "-postedBy.email") // Exclude email in posts
            .populate("followers", "-email")
            .populate("following", "-email");

        if (!userdata) {
            return res.status(404).send({ error: "User not found" });
        }

        res.send(userdata); 
    } catch (error) {
        console.error("Error fetching user profile:", error);
        res.status(500).send({ error: "Internal server error" });
    }
});

app.get("/profile-edit/:username", authenticateToken,(req, res) => {
    res.render("profile.edit.ejs");
});








function authenticateToken(req, res, next) {
    const token = req.cookies.token;
    if (token == null) return res.redirect("/login");
    else {
        jwt.verify(token, "secret", (err, user) => {
            if (err) return res.redirect("/login");
            req.user = user;
            next();
        });
    }
} //middleware for authenticating the user

  function protectLogin(req, res, next) {
    const token = req.cookies.token || ''; // Get token from cookie 
  
    if (token) { // User has a token
      jwt.verify(token, 'secret', (err, user) => {
        if (err) { 
          // Handle invalid/expired token (optional) 
          // You might want to clear the cookie/cache and redirect to login
        } else {
          return res.redirect('/home'); // Or another protected route
        }
      });
    } else {
      // No token, proceed to login (allow access to /login)
      next();
    }
  }


    


export default app;
