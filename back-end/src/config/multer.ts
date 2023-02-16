import multer, { Options } from "multer";
import path from "path";

export default {
  storage: multer.diskStorage({
    destination: path.resolve("src/uploads/imgs"),
    filename(req, file, callback) {
      callback(null, `${Date.now()}-${file.originalname}`)
    },
  }),
  limits: {
    fileSize: 8 * 1024 * 1024 //* 8MB
  },
  fileFilter: (req, file, callback) => {
    const mimeType = ["image/png", "image/jpeg", "image/gif", "image/jpg"]

    if ( !mimeType.includes(file.mimetype) ) {
      return callback(null, false)
    };

    callback(null, true);
  }
} as Options;