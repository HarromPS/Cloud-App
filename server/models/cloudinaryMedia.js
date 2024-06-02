import mongoose from "mongoose";

const CloudMedia = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    media:{
        public_id:{
            type:String,
            // required:true
        },
        url:{
            type:String,
            // required:true
        }
    }
},
    {collection:"cloud_media"}    
)

export default mongoose.model("cloud_media",CloudMedia);