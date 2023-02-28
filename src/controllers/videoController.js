import Video from "../models/video";

/*
export const home = (req,res) => {
    console.log("start");
    Video.find({},(error,videos)=>{
        return res.render("home",{pageTitle:"Home",vides});
    });
    console.log("finished");   
}
*/
export const home = async(req,res) =>{
    const videos = await Video.find({}).sort({createdAt:"desc"}); 
     res.render("home",{pageTitle : "Home",videos});
}

export const watch = async(req,res) => {
    const {id} = req.params;
    const video = await Video.findById(id);

    if(!video){
        return res.status(404).render("404",{pageTitle:"Video not found"});
    }
    return res.render("watch",{pageTitle : video.title , video});

}

export const getEdit = async(req,res) => {
    const { id } = req.params;
    const video = await Video.findById(id);

    if(!video){
        return res.status(404).render("404",{pageTitle:"Video not found"});
    }
    return res.render("edit",{pageTitle:`Editing : ${video.title}`,video});
}

export const postEdit = async(req,res) => {
    const {title , description , hashtags} = req.body;
    
    //const video = await Video.findById(id);
    const { id } = req.params;
    const video = await Video.exists({_id : id});
    
    if(!video){
        return res.render("404",{pageTitle:"Video not found."});
    }

    // video.title = title;
    // video.description = description;
    // video.hashtags = hashtags.split(",").map((word)=>(word.startWith("#") ? word : '#${word}'));
    // await video.save();

    await Video.findByIdAndUpdate(id,{
        title,
        description,
        hashtags : Video.formatHashtags(hashtags),
        
    });


    return res.redirect(`/videos/${id}`);
};


export const getUpload = (req,res) => {
    return res.render("upload",{pageTitle :"Upload Vides"});
}

export const postUpload = async(req,res) => {

    const {title,description,hashtags} = req.body;
    // const video = new Video({
    //     title : title,
    //     description : description,
    //     createdAt : Date.now(),
    //     hashtags : hashtags.split(",").map((word) => `#${word}`),
    //     meta : {
    //         views : 0,
    //         rating : 0
    //     }
    // });
    try{
        await Video.create({
            title,
            description,
            // createdAt : Date.now(),
            // hashtags : hashtags.split(",").map((word) => (word.startsWith("#") ? word : `#${word}`)),
            hashtags : Video.formatHashtags(hashtags),
        
        });
        return res.redirect("/");
    }catch(error){
        return res.status(400).render("upload",{
            pageTitle : "Upload Video",
            errorMessage : error._message 
        });
    }
}

export const deleteVideo = async(req,res) => {
   const {id} = req.params;
   await Video.findByIdAndDelete(id);
   return res.redirect("/"); 
}

export const search = async(req,res) => {
    const {keyword} = req.query;
    console.log("sjdasdasdjasjdj    ------>>>>  ",keyword);
    let videos = [];
    if(keyword){
        videos = await Video.find({
            title : {
                $regex: new RegExp(`${keyword}$`, "i"),
            }
        });
        console.log("??????? --> ",videos[0].id);    
    }

    
    return res.render("search",{pageTitle : "Search",videos});
}