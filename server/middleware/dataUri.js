// getData Uri: To convert file content into a Data URI of file received from request.file
import DataUriParser from "datauri/parser.js";
import path from "path";

// get the uri of file
const getUri = (file)=>{
    const parser = new DataUriParser();
    const extensionName = path.extname(file.originalname).toString();
    return parser.format(extensionName,file.buffer);   //  file.content: buffer or binary data,  parser: converts the file content into a Data URI string.

}

export default getUri;