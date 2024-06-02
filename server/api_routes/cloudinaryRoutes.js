// create a router from express
import express from "express";
import singleUpload from "../middleware/singleUpload.js";
import getUri from "../middleware/dataUri.js";
import cloudinaryMedia from "../models/cloudinaryMedia.js";
import cloudinary from "../middleware/connectCloudinary.js";

// create api endpoints
const router = express.Router();

const fetchResources = async (resourceType, nextCursor) => {
    return await cloudinary.api.resources({
        type: 'upload',
        resource_type: resourceType,
        max_results: 500,
        next_cursor: nextCursor,
    });
};

// fetch all the medias

// get all images
router.get('/getAllImages', async (req, res) => {
    try {
        let images = [];
        let nextCursor = null;
        do {
            const imageResult = await fetchResources('image', nextCursor);
            images = images.concat(imageResult.resources.filter(resource => resource.format === 'png' || 'jpeg' || 'jpg'));
            nextCursor = imageResult.next_cursor;
        } while (nextCursor);

        res.status(200).json({ images });
    } catch (error) {
        res.status(500).json({ msg: 'Internal error occurred', error: error.message });
    }
});


// get all pdfs
router.get('/getAllPdfs', async (req, res) => {
    try {
        let pdfs = [];
        let nextCursor = null;
        do {
            const pdfResult = await cloudinary.api.resources({
                type: 'upload', // Change resource_type to 'upload'
                prefix: '', // Optionally, provide a prefix if your PDFs are stored in specific folders
                max_results: 500,
                next_cursor: nextCursor,
            });
            pdfs = pdfs.concat(pdfResult.resources.filter(resource => resource.format === 'pdf'));
            nextCursor = pdfResult.next_cursor;
        } while (nextCursor);

        res.status(200).json({ pdfs });
    } catch (error) {
        res.status(500).json({ msg: 'Internal error occurred', error: error.message });
    }
});


// get all videos
router.get("/getAllVideos",async (req,res)=>{
    try {
        let videos = [];
        let nextCursor = null;
        do {
            const videoResult = await fetchResources('video', nextCursor);
            videos = videos.concat(videoResult.resources);
            nextCursor = videoResult.next_cursor;
        } while (nextCursor);

        res.status(200).json({ videos });
    } catch (error) {
        res.status(500).json({ msg: 'Internal error occurred', error: error.message });
    }
});

// upload images
router.post('/createRequestForImages', singleUpload, async (req, res) => {
    try {

        // get the uploaded file
        const file = req.file;
        const title = req.body.title;
        // console.log(file.originalname);

        // get the data uri using getDataUri method
        const fileDataUri = getUri(file);
        // console.log(Object.keys(fileDataUri)); // from return statement
        // console.log(fileDataUri.fileName)   // gives extension name

        let resData = {
            success: false,
            msg: '',
            data: {}
        }
        // uploading media to cloudinary
        const cloud = await cloudinary.uploader.upload(fileDataUri.content, { resource_type: "image" }, (error, result) => {
            if (error) {
                console.log(error);
                resData.success = false;
                resData.msg = "Error";
            }
            resData.success = true;
            resData.msg = "Uploaded";
            resData.data = result
        });

        let promise = await cloudinaryMedia.create({
            title: title,
            media: {
                public_id: cloud.public_id,
                url: cloud.secure_url
            }
        })

        res.status(200).json(resData);
    } catch (error) {
        res.status(500).json({ msg: "Internal error occured", err: error });
    }
});

// upload videos
router.post('/createRequestForVideos', singleUpload, async (req, res) => {
    try {

        // get the uploaded file
        const file = req.file;
        const title = req.body.title;
        // console.log(file.originalname);

        // get the data uri using getDataUri method
        const fileDataUri = getUri(file);
        // console.log(Object.keys(fileDataUri)); // from return statement
        // console.log(fileDataUri.fileName)   // gives extension name

        let resData = {
            success: false,
            msg: '',
            data: {}
        }
        // uploading media to cloudinary
        const cloud = await cloudinary.uploader.upload(fileDataUri.content, { resource_type:"video" }, (error, result) => {
            if (error) {
                console.log(error);
                resData.success = false;
                resData.msg = "Error";
            }
            resData.success = true;
            resData.msg = "Uploaded";
            resData.data = result
        });

        let promise = await cloudinaryMedia.create({
            title: title,
            media: {
                public_id: cloud.public_id,
                url: cloud.secure_url
            }
        })

        res.status(200).json(resData);
    } catch (error) {
        res.status(500).json({ msg: "Internal error occured", err: error });
    }
});

// upload pdfs
router.post('/createRequestForPDfs', singleUpload, async (req, res) => {
    try {

        // get the uploaded file
        const file = req.file;
        const title = req.body.title;
        // console.log(file.originalname);

        // get the data uri using getDataUri method
        const fileDataUri = getUri(file);
        // console.log(Object.keys(fileDataUri)); // from return statement
        // console.log(fileDataUri.fileName)   // gives extension name

        let resData = {
            success: false,
            msg: '',
            data: {}
        }
        // uploading media to cloudinary
        const cloud = await cloudinary.uploader.upload(fileDataUri.content, { resource_type: "raw" }, (error, result) => {
            if (error) {
                console.log(error);
                resData.success = false;
                resData.msg = "Error";
            }
            resData.success = true;
            resData.msg = "Uploaded";
            resData.data = result
        });

        let promise = await cloudinaryMedia.create({
            title: title,
            media: {
                public_id: cloud.public_id,
                url: cloud.secure_url
            }
        })

        res.status(200).json(resData);
    } catch (error) {
        res.status(500).json({ msg: "Internal error occured", err: error });
    }
});

export default router;