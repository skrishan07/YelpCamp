var express    = require("express");
var router     = express.Router();
var Campground = require("../models/campgrounds");
var middleware = require("../middleware");
// var Fuse       = require("fuse.js");
// var sizeOf = require('image-size');



//show all campgrounds
router.get("/",function(req,res){
    Campground.find({},function(err,allcamps){
        if(err){
            console.log(err);
        }
        else{
            res.render("campgrounds/index",{ camps : allcamps });
        }
    });
});

//new campground form
router.get("/new",middleware.isLoggedIn,function(req,res){
    res.render("campgrounds/new");
});

//create new campground
router.post("/",middleware.isLoggedIn,function(req,res){
    var nname=req.body.name;
    var nprice=req.body.price;
    var nimage=req.body.imageurl;
    var ndesc=req.body.description;
    var nauthor = {
        id : req.user._id,
        username : req.user.username
    };
    
    Campground.create({title:nname,price:nprice,image:nimage,description:ndesc,author:nauthor},function(err,camp){
        if(err){
            console.log(err);
        }
        else{
            console.log(camp.author);
            req.flash("success","Campground successfully created!");
            res.redirect("/campgrounds");
        }   
    });
});

//show a particular campground
router.get("/:id",function(req,res){
    Campground.findById(req.params.id).populate("comments").exec(function(err,foundCamp){
        if(err || !foundCamp){
            req.flash("error","Campground not found");
            // console.log(err);
            res.redirect("/campgrounds");
        }
        else{
            // console.log(foundCamp.image);
            // sizeOf(foundCamp.image, function (err, dimensions) {
            //     console.log(dimensions)
            // })
            res.render("campgrounds/show",{campground:foundCamp});
        }
    });
});

//edit the campground
router.get("/:id/edit",middleware.campgroundOwnership,function(req,res){
    Campground.findById(req.params.id,function(err,camp){
        if(err){
            console.log(err);
            res.redirect("/camgrounds");
        }else{
            res.render("campgrounds/edit",{campground:camp});
        }
    });
});

//update the campground
router.put("/:id",middleware.campgroundOwnership,function(req,res){
    Campground.findByIdAndUpdate(req.params.id,req.body.camp,function(err,foundcamp){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        }else{
            console.log(req.body.camp);
            console.log(foundcamp);
            req.flash("success","Campground successfully updated!");
            res.redirect("/campgrounds/"+req.params.id);
        }
    });
});

//destroy the campground
router.delete("/:id",middleware.campgroundOwnership,function(req,res){
    Campground.findByIdAndRemove(req.params.id,function(err){
        if(err){
            console.log(err);
            res.redirect("/campgrounds");
        }else{
            req.flash("success","Campground successfully deleted!");
            res.redirect("/campgrounds");
        }
    });
});

module.exports = router;