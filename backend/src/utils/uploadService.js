const cloudinary = require("../config/cloudinary");

const uploadImages = async (base64Images, folder) => {
  const uploadPromises = base64Images.map(async (base64) => {
    try {
      const result = await cloudinary.uploader.upload(`${base64}`, {
        folder: folder,
        resource_type: "image",
      });
      const response = {
        public_id: result.public_id,
        url: result.secure_url,
      };
      return response;
    } catch (error) {
      console.error("Error uploading image to Cloudinary:", error);
      throw error;
    }
  });

  try {
    const imageUrls = await Promise.all(uploadPromises);
    return imageUrls;
  } catch (error) {
    console.error("Error uploading images:", error);
    throw error;
  }
};

module.exports = { uploadImages };
