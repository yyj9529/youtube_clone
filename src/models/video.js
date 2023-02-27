import mongoose from "mongoose";

//required 속성을 주지 않으면 타입에 맞지않는 값을 할당했을시 그 속성은 추가되지 않음
const videoSchema = new mongoose.Schema({
    title : {type : String , required : true, trim : true , maxLength : 80},
    description :{type : String , required : true , minLength: 20} ,
    createdAt : {type : Date , required : true , default : Date.now},
    hashtags : [{type: String , trim : true}],
    meta : {
        views : {type : Number , default : 0, required : true},
        rating : {type : Number, default : 0 , required : true},
    },
});

// videoSchema.pre("save",async function(){
//     this.hashtags = this.hashtags[0].split(",")
//     .map((word)=> (word.startsWith("#")? word :`#${word}`));
// });

videoSchema.static("formatHashtags",function(hashtags){
    return hashtags.split(",").map(
        (word) => (word.startsWith("#") ? word :`#${word}`) 
    );
});

const Video = mongoose.model("Video",videoSchema)

export default Video;