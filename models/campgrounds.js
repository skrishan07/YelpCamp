var mongoose    =require("mongoose");

var campSchema=new mongoose.Schema({
    title:String,
    price:String,
    image:String,
    description:String,
    createdAt: { type: Date, default: Date.now },
    author:{
        id:{
            type : mongoose.Schema.Types.ObjectId,
            ref : "User"
        },
        username: String
    },
    comments:[{
        type : mongoose.Schema.Types.ObjectId,
        ref : "Comments"
    }]
});

module.exports=mongoose.model("Campground",campSchema);