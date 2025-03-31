import {v2 as cloudinary} from "cloudinary"
import fs from "fs"

    // Configuration
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
    });

    const uploadOnCloudinary = async (localFilePath) =>{
    try{
        if(!localFilePath)
            return null;
        // upload the file on cloudinary
        const uploadResult = await cloudinary.uploader
            .upload(
            localFilePath, {
                // upload options 
                resource_type : "auto",
                }
            )
            console.log("Uploaded successfully!");
            
        console.log(uploadResult.url);
        return uploadResult;
    }
    catch(err){
    // if theres error, we remove the file ie. unlink
    fs.unlink(localFilePath) // removes the locally saved temp file
    return null;
    }
    }

    export {uploadOnCloudinary};

    