const express = require('express');
const app = express();
const passport = require("./configs/passport")
const session = require('express-session');
const cors = require('cors')
const fbpassport = require("./configs/fbpassport");

//add controllers here
const {register, login} = require("./controllers/authController")
const doctorController = require("./controllers/doctorController");
const categoryController = require("./controllers/categoryController");
const postController = require("./controllers/postController");
const replyController = require("./controllers/replyController");
const likeController = require("./controllers/likeController");
const slotController = require("./controllers/slotController");
const appointmentController = require("./controllers/appointmentController");

app.use(cors({origin: 'http://localhost:3000', credentials: true}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
    session({
        secret: 'secretcode',
        resave: true,
        saveUninitialized: true,
    })
)
app.use(passport.initialize());
app.use(passport.session());
app.use("/categories", categoryController);
app.use("/doctors", doctorController);
app.use("/posts", postController);
app.use("/replies", replyController);
app.use("/likes", likeController);
app.use("/slots", slotController);
app.use("/appointments", appointmentController);

passport.serializeUser(function({user, token}, done) {
    done(null, {user, token});
});
  
passport.deserializeUser(function({user, token}, done) {
    done(null, {user, token});
});


//---------------fb auth----------//

app.get('/auth/facebook',
  passport.authenticate('facebook',{ scope : 'email' }));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
   res.redirect('http://localhost:3000/blueaura');
  });

  
//---------------google auth----------//

app.get("/auth/google/failure", function(req, res) {
    return res.send("Something went wrong");
})

app.get('/auth/google',
  passport.authenticate('google', { scope:
      [ 'email', 'profile' ] }
));

app.get( '/auth/google/callback',
    passport.authenticate( 'google', {
        failureRedirect: '/auth/google/failure'
}), function(req, res) {
    res.redirect('http://localhost:3000/blueaura')
});


//-----------------Normal Login---------------//

app.post("/register", register);
app.post("/login", login);
app.get('/profile',isLoggedIn,(req, res) => {
    res.send(req.user);
})

app.get("/",(req,res)=>{
    res.send("Hello")
})

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('http://localhost:3000');
}


module.exports = app;