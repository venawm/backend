import cloudinary from "../config/cloudinaryConfig.js";

// Middleware function for uploading single file to Cloudinary
export const uploadSingleFile = async (file: any) => {
  const currentDateTime = new Date().toISOString().replace(/[-:.]/g, ""); // Get current date and time
  const originalnameWithoutExtension = file.originalname
    .split(".")
    .slice(0, -1)
    .join("."); // Remove file extension
  const publicId = `contour-uploads/${currentDateTime}_${originalnameWithoutExtension}`; // Create unique public_id
  const result = await cloudinary.uploader.upload(file.path, {
    public_id: publicId,
  });
  return result.secure_url;
};
