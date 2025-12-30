import fs from 'fs';
import path from 'path';

const deleteFileFromUpdate = (relativePath: string) => {
    const fullPath = path.join(process.cwd(), relativePath);

    if (fs.existsSync(fullPath)) {
        fs.unlinkSync(fullPath);
    }
};

export default deleteFileFromUpdate;
