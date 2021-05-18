var express=require("express");
var router=express.Router();
var passport      = require("passport");
var User    = require("../models/user");
var middleware  = require("../middleware");

router.get("/",function(req,res){
    res.render("landing");
});

//Aut. Routes
router.get("/register",function(req,res){
    res.render("register");
});
router.post("/register",function(req,res){
    User.register(new User({username : req.body.username}),req.body.password,function(err,user){
        if(err){
            console.log(err);
            req.flash("error",err.message );
            res.redirect("/register");
        }
        passport.authenticate("local")(req,res,function(){
            req.flash("success","Welcome to Yelpcamp "+ user.username );
            res.redirect("/campgrounds");
        });
    })
});

router.get("/login",function(req,res){
    res.render("login");
});

router.post("/login",passport.authenticate("local",{
        successRedirect : "/campgrounds",
        failureRedirect : "/login",
        failureFlash : true
    }),function(req,res){
});

router.get("/logout",function(req,res){
    req.logout();
    req.flash("success","Successfully LogOut!");
    res.redirect("/campgrounds");
});

module.exports = router;