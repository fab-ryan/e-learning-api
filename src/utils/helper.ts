import { diskStorage } from 'multer';
import fs from 'fs';
import path from 'path';

const getFileName = (file: Express.Multer.File, dir?: string | undefined) => {
  const name = file.originalname.split('.')[0];
  const ext = file.originalname.split('.')[1];

  return `${removeWhiteSpace(name)}-${Date.now()}.${ext}`;
};
const removeWhiteSpace = (str: string) => {
  return str.replace(/\s/g, '').toLowerCase();
};

export const storage = (dir?: string | undefined) =>
  diskStorage({
    destination: (
      req: Express.Request,
      file: Express.Multer.File,
      cb: (error: Error | null, destination: string) => void,
    ) => {
      // if (file.size > 1024 * 1024 * 5) {
      //   return cb(new Error('File is too large'), null);
      // } else if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
      //   return cb(new Error('Only image files are allowed!'), null);
      // }
      const distination = path.join(__dirname, '../../uploads', dir || '');
      if (!fs.existsSync(distination)) {
        fs.mkdirSync(distination);
      }
      cb(null, distination);
    },
    filename: (req, file, cb) => {
      cb(null, getFileName(file, dir));
    },
  });

export const removeFile = (fileName: string) => {
  const filePath = path.join(__dirname, `../../uploads/${fileName}`);
  if (!fs.existsSync(filePath)) {
    return;
  }
  fs.unlink(filePath, (err) => {
    if (err) {
      throw err;
    }
  });
};

export const generateSlug = (title: string) => {
  return title
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '');
};

export const getUploadPath = (fileName: string) => {
  const regix = new RegExp(/https?:\/\//);
  if (regix.test(fileName)) {
    return fileName;
  }
  return `${process.env.BACKEND_DOMAIN}/uploads/${fileName}`;
};
