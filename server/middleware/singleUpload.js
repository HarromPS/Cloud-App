// handles file uploads: to get access to request.file
import multer from "multer";

// using local memory storage, deletes files after request is fulfilled
const storage = multer.memoryStorage(); 

// for single file upload 
const singleUpload = multer({   // pass the storage
    storage
}).single("file")             // for single file, same name file from the file variable in route function(used here in middleware)

export default singleUpload;  // now use this middleware before any request,response cycle of any route