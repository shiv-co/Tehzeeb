import path from 'path';
import express from 'express';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { protect } from '../middleware/authMiddleware.js'; // Corrected import path
import asyncHandler from 'express-async-handler';

const router = express.Router();

// Configure multer for memory storage
const storage = multer.memoryStorage();

function checkFileType(file, cb) {
  const filetypes = /jpe?g|png|webp/;
  const mimetypes = /image\/jpe?g|image\/png|image\/webp/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = mimetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb(new Error('Images only! (jpg, jpeg, png, webp)'), false);
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB file size limit per file
});

// @route   POST /api/upload
// @desc    Upload multiple images to Cloudinary
// @access  Private (Protected by 'protect' middleware)
router.post(
  '/',
  protect, // Ensure user is logged in
  upload.array('images', 5), // <-- KEY: 'images' field name, up to 5 files
  asyncHandler(async (req, res) => {
    if (!req.files || req.files.length === 0) {
      res.status(400);
      throw new Error('No images uploaded');
    }

    // Create an array of promises for each file upload
    const uploadPromises = req.files.map((file) => {
      return new Promise((resolve, reject) => {
        // Use a stream to upload from the file buffer
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            resource_type: 'image',
            folder: 'tehzeeb', // Your Cloudinary folder
          },
          (error, result) => {
            if (error) {
              console.error('Cloudinary Upload Error:', error);
              return reject(new Error('Image upload failed'));
            }
            // On success, resolve with the secure URL
            resolve(result.secure_url);
          }
        );
        // Pipe the file buffer into the upload stream to start the upload
        uploadStream.end(file.buffer);
      });
    });

    try {
      // Wait for all upload promises to resolve
      const imageUrls = await Promise.all(uploadPromises);
      
      // Send back the array of URLs
      res.status(200).json({
        message: 'Images uploaded successfully',
        images: imageUrls, // This is the array of URLs
      });
    } catch (error) {
      res.status(500);
      throw new Error('Server error during image upload');
    }
  })
);

export default router;

