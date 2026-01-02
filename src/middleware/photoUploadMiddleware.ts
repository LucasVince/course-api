import multer from 'multer';
import path from 'path';
import fs from 'fs';

const uploadPath = path.resolve(__dirname, '..', '..', 'uploads', 'photos');

if (!fs.existsSync(uploadPath)) {
    fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, uploadPath);
    },
    filename: (_req, file, cb) => {
        const uniqueSufix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, `${uniqueSufix}-${file.originalname}`);
    },
});

export const photoUpload = multer({ storage });
