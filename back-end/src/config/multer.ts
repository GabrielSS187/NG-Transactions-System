import multer, { Options } from "multer";
import path from "path";

const pathImg = () => {
  if ( process.env.NODE_ENV && process.env.NODE_ENV === "production" ) {
    return path.resolve("/tmp/uploads/imgs")
  } else {
    return path.resolve("src/uploads/imgs")
  }
};

export default {
  storage: multer.diskStorage({
    destination: pathImg(),
    filename(req, file, callback) {
      callback(null, `${Date.now()}-${file.originalname}`)
    }
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