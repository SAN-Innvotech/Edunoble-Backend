const cloudinary = require('cloudinary').v2;
require('dotenv').config();

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Utility function to upload to Cloudinary
const uploadToCloudinary = async (fileBuffer, fileName, folder) => {
  try {
    // Return a promise that resolves when the upload is complete
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: folder, // Upload to specific folder in Cloudinary
          public_id: fileName, // Set public_id as file name (you can customize this)
        },
        (error, result) => {
          if (error) {
            console.error("Error uploading to Cloudinary:", error);
            reject(error); // Reject the promise in case of an error
          } else {
            resolve(result); // Resolve the promise with the result from Cloudinary
          }
        }
      );
      
      // Pass the file buffer into the stream
      uploadStream.end(fileBuffer);
    });
  } catch (error) {
    console.error('Error uploading to Cloudinary:', error);
    throw new Error('Failed to upload image');
  }
};

module.exports = { uploadToCloudinary };
