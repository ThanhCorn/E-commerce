import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import "dotenv/config";
dotenv.config();

cloudinary.config({
  cloud_name: "dfytizewk",
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

export const cloudinaryUpload = async (file: Express.Multer.File) => {
  return new Promise((resolve) => {
    cloudinary.uploader.upload(
      file.path,
      { resource_type: "auto" },
      (error, result) => {
        if (error) {
          console.error("Error while uploading to cloudinary:", error);
          resolve(null);
        } else {
          resolve({
            public_id: result?.public_id,
            url: result?.secure_url,
            asset_id: result?.asset_id,
          });
        }
      }
    );
  });
};

export const cloudinaryDelete = async (id: string) => {
  return new Promise((resolve) => {
    cloudinary.uploader.destroy(id, (error, result) => {
      if (error) {
        console.error("Error while deleting image from cloudinary:", error);
        resolve(null);
      } else {
        resolve(result);
      }
    });
  });
};
