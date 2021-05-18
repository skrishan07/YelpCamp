var express     = require("express");
var router      = express.Router({mergeParams:true});
var Campground  = require("../models/campgrounds");
var Comments    = require("../models/comments");
var middleware  = require("../middleware");

//new comment form
router.get("/new",middleware.isLoggedIn,function(req,res){
    Campground.findById(req.params.id,function(err,camp){
        if(err){
            console.log(err);
            res.redirect("back");
        }
        else{
            res.render("comment/new",{ camp : camp });
        }
    });
});

//create comment
router.post("/",middleware.isLoggedIn,function(req,res){
    Campground.findById(req.params.id,function(err,camp){
        if(err){
            console.log(err);
        }
        else{
            Comments.create(req.body.comment,function(err,newcomment){
                if(err){
                    console.log(err);
                    res.redirect("back");
                }
                else{
                    newcomment.author.id=req.user._id;
                    newcomment.author.username=req.user.username;
                    newcomment.save();
                    camp.comments.push(newcomment);
                    camp.save();
                    req.flash("success","Comment successfully created");
                    res.redirect("/campgrounds/"+req.params.id );
                }
            })
        }
    });
});

//edit comment form
router.get("/:commentid/edit",middleware.commentOwnership,function(req,res){
    Comments.findById(req.params.commentid,function(err,fid){
        if(err){
            res.redirect("back");
        }
        else{
            res.render("comment/edit",{camp:req.params.id,comment:fid});
        }
    })
    
});

//update comment
router.put("/:commentid",middleware.commentOwnership,function(req,res){
    Comments.findByIdAndUpdate(req.params.commentid,req.body.comment,function(err,updatecomment){
        if(err){
            res.redirect("back");
        }
        else{
            req.flash("success","Comment successfully updated");
            res.redirect("/campgrounds/"+req.params.id);
        }
    })
});

//delete comment
router.delete("/:commentid",middleware.commentOwnership,function(req,res){
    Comments.findByIdAndRemove(req.params.commentid,function(err){
        if(err){
            res.redirect("back");
        }
        else{
            req.flash("success","Comment successfully deleted");
            res.redirect("/campgrounds/"+req.params.id);
        }
    });
});

module.exports = router;