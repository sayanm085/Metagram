import express from "express";
import jwt, { sign } from "jsonwebtoken";
import cookieParser from "cookie-parser";
import User from "./models/user.js";


let signon =express();

signon.use(cors());





signon.set("view engine", "ejs");
signon.use(express.urlencoded({ extended: false })); //using the middleware
signon.use(express.static("public") ); //using the middleware
signon.use(cookieParser());
signon.use(express.json());


signon.get("/", (req, res) => {
    res.redirect("/login");
});

signon.get("/login",protectLogin,  (req, res) => {
    res.render("login");

}); 

signon.post("/login",   async (req, res) => {  //logging in the user
    const { username, password } = req.body;
    try {
        const user = await User.findOne({username});
        if (!user){
           res.redirect("/login");
        }
        else {
            const isMatch = await user.verifyPassword(password);
            if (isMatch){
                let token = jwt.sign({ username: username ,password:user.password}, "secret", { expiresIn: "7D" }); 
                res.cookie("token", token);
                res.redirect("/home");
                console.log(isMatch );
            }
            else {
                res.redirect("/login");
            }
        }

    } catch (error) {
        console.log(error);
    }
});

signon.get("/register", protectLogin, (req, res) => {
    res.render("register");
});

signon.post("/register", async (req, res) => { //registering the user
   
    const {fastname,lastname,username, email, password } = req.body;
    const user = new User({ fastname, lastname, username, email, password  });
    await user.save().then((i) => {


        let token = jwt.sign({ username: username,password: password}, "secret", { expiresIn: "1h" }); 
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



function protectLogin(req, res, next) {
    const token = req.cookies.token || ''; // Get token from cookie 
  
    if (token) { // User has a token
      jwt.verify(token, 'secret', (err, user) => {
        if (err) { 
          // Handle invalid/expired token (optional) 
          // You might want to clear the cookie/cache and redirect to login
        } else {
          return res.redirect('/blogpage'); // Or another protected route
        }
      });
    } else {
      // No token, proceed to login (allow access to /login)
      next();
    }
  }

  export default signon;