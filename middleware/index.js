var Campground    = require("../models/campgrounds");
var Comments      = require("../models/comments");
var middlewareObj = {};

middlewareObj.isLoggedIn = function (req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error","You need to be login to do that" );
    res.redirect("/login");
};

middlewareObj.commentOwnership = function (req,res,next){
    if( req.isAuthenticated() ){
        Comments.findById(req.params.commentid,function(err,foundcomment){
            if(err || !foundcomment){
                req.flash("error","Comment not found" );
                res.redirect("/campgrounds");
            }else{
                if( foundcomment.author.id.equals(req.user._id) ){
                    next();
                }else{
                    res.redirect("back");
                }
            }
        });
    }else{
        res.redirect("back");
    }
};

middlewareObj.campgroundOwnership = function (req,res,next){
    if( req.isAuthenticated() ){
        Campground.findById(req.params.id,function(err,foundcamp){
            if(err || !foundcamp){
                req.flash("error","Campground not found");
                res.redirect("/campgrounds");
            }else{
                if( foundcamp.author.id.equals(req.user._id) ){
                    next();
                }else{
                    req.flash("error","You don't have permission to do that" );
                    res.redirect("/campgrounds");
                }
            }
        });
    }else{
        req.flash("error","You need to login to do that" );
        res.redirect("/campgrounds");
    }
};

module.exports=middlewareObj;