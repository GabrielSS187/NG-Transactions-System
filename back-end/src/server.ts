import multer, { Options } from "multer";
import path from "path";

export default {
  storage: multer.diskStorage({
   destination: function (req, file, cb) {
      const fieldName = file.fieldname;
      let uploadPath;
      if (fieldName === "tempFile") {
        uploadPath = path.resolve("src/uploads/tmp");
      } else if (fieldName === "image") {
        uploadPath = path.resolve("src/uploads/imgs");
      } else {
        return;
      }
      cb(null, uploadPath);
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
  },
  // adicionando a propriedade tmpdir para a pasta temporária
  tmpdir: path.resolve("tmp")
} as Options;
