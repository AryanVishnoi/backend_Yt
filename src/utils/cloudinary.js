import {
    v2 as cloudinary
} from 'cloudinary';
import fs from "fs";


// Configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


const uploadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) {
            return null
        }
        //upload the file on cloudinary
        // Upload an image
        const response = await cloudinary.uploader
            .upload(
                localFilePath, {
                    resource_type: "auto",
                }
            )
        // File upload successfully!
        console.log("File is uploaded in cloundinary")
        console.log("responseURL:", response.url);
        return response

    } catch (error) {
        // if there is any error on uploading the file then unlink the file from local storage
        fs.unlinkSync(localFilePath)
        return null;
    }
}

export {
    uploadOnCloudinary
}

;