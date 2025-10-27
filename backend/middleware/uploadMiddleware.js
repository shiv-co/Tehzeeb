import multer from 'multer';

// Use memory storage to temporarily hold the file
const storage = multer.memoryStorage();

// Initialize multer with the storage engine
const upload = multer({ storage: storage });

export default upload;
