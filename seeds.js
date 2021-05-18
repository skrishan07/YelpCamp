var mongoose    =require("mongoose");
var Campground  =require("./models/campgrounds");
var Comment     =require("./models/comments");

data=[
    {
        title: "Squamish valley",
        image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
        description: 'The Squamish Valley Golf Club is truly a delight to behold, with the lakes, mountains, rivers and tree-lined fairways making for a memorable round of golf. One of the best ways to truly capture the beauty of the course is from above. By clicking on the links below you can view a fly over of all 18 holes, along with commentary on how to best play each hole.'
    },
    {
        title: "Sierra National Forest",
        image: "https://images.unsplash.com/photo-1537565266759-34bbc16be345?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
        description: 'Sierra National Forest is a U.S. National Forest located on the western slope of central Sierra Nevada in Central California and bounded on the northwest by Yosemite National Park and the south by Kings Canyon National Park. The forest is known for its mountain scenery and natural resources. Forest headquarters are located in Clovis, California. There are local ranger district offices in North Fork and Prather.'
    },
    {
        title: "Badavut Beach",
        image: "https://images.unsplash.com/photo-1517824806704-9040b037703b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
        description: 'If your idea of going to the beach is lying on a lounger inches away from a stranger, this might be your kind of place. Expensive cafes charging expensive rates for loungers. Over commercialised, over crowded, dirty. I fled within 5 minutes.'
    },
    {
        title: "Niederbauen-Chulm",
        image: "https://images.unsplash.com/photo-1464547323744-4edd0cd0c746?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80",
        description: 'The Niederbauen-Chulm is a mountain of the Urner Alps, overlooking Lake Lucerne in Central Switzerland. Its 1,923 metre high summit is located on the border between the cantons of Nidwalden and Uri.'
    }
];

function seedDB()
{
    Campground.remove({},function(err){
        if(err){
            console.log(err);
        }
//         else{
//             console.log("All Campgrounds are removed");
// //Creating New Campgrounds
//             data.forEach(function(seed){
//                 Campground.create(seed,function(err,camp){
//                     if(err){
//                         console.log(err);
//                     }
//                     else{
//                         console.log("Campground Created");
//                         //Creating Comments
//                         Comment.create({
//                             text : "This is a great place , but I wish there was internet",
//                             author : "Homer"
//                         },function(err,comment){
//                             if(err){
//                                 console.log(err);
//                             }
//                             else{
//                                 camp.comments.push(comment);
//                                 camp.save();
//                             }
//                         });
//                     }
//                 });
//             });

//         }
    });
}

module.exports=seedDB;