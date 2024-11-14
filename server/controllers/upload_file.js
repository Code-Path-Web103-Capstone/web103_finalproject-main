import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Set up multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../data');
    console.log('Upload path:', uploadPath); // Log the upload path
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const fileName = 'STATEMENT.pdf';
    console.log('File name:', fileName); // Log the file name
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

const handleUploadPdf = (req, res) => {
  upload.single('pdf')(req, res, (err) => {
    if (err) {
      console.error('Error uploading file:', err);
      return res.status(500).json({ error: 'Error uploading file' });
    }
    const filePath = path.join(__dirname, '../data/STATEMENT.pdf');
    console.log('File saved at:', filePath); // Log the file path
    res.status(200).json({ message: 'File uploaded successfully', filePath: filePath });
  });
};

export default { handleUploadPdf };