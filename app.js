var express       = require("express"),
    app           = express(),
    mongoose      = require("mongoose"),
    bodyParser    = require("body-parser"),
    User          = require("./models/user"),
    Comments      = require("./models/comments"),
    Campground    = require("./models/campgrounds"),
    passport      = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride= require("method-override"),
    flash         = require("connect-flash"),
    seedDB        = require("./seeds");

var campgroundRouter = require("./routes/campgrounds");
var commentRouter    = require("./routes/comments");    
var authRouter       = require("./routes/index");    


// seedDB();

mongoose.connect("mongodb://localhost/yelp_camp_v1", { useNewUrlParser: true , useUnifiedTopology: true });
mongoose.set('useFindAndModify', false);

app.set("view engine","ejs");
app.use( bodyParser.urlencoded( { extended:true } ) );
app.use(express.static("public"));
app.use(methodOverride("_method"));
app.use(flash());

app.locals.moment = require("moment");
app.use(require("express-session")({
    secret : "Hala Madrid",
    resave : false,
    saveUninitialized : false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
    res.locals.error=req.flash("error");
    res.locals.success=req.flash("success");
    res.locals.currentUser=req.user;
    next();
});

app.use("/campgrounds",campgroundRouter);
app.use("/campgrounds/:id/comment",commentRouter);
app.use("/",authRouter);

app.listen(3000,function(){
    console.log("Yelpcamp Server has started!");
})