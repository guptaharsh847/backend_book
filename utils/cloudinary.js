const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
// console.log("🧪 Cloudinary ENV:", {
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET ? '✔️' : '❌',
// });

const uploadImageToCloudinary = async (imageData, folder = 'book_covers') => {
  try {
    const result = await cloudinary.uploader.upload(imageData, {
      folder,
    });
    return result.secure_url; // Return the secure URL of the uploaded image
  } catch (error) {
    console.error('Cloudinary upload error:', error);

    throw error;
  }
};

module.exports = { uploadImageToCloudinary };
