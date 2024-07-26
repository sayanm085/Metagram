import multer from "multer";
import crypto from "crypto";
import path from "path";

const storage = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {// destination folder
      cb(null, './public/uploads/')
    },
    filename: function (req, file, cb) {// file name
        const uniqueSuffix = crypto.randomBytes( 16 ).toString( "hex" ) + path.extname(file.originalname);
        console.log(uniqueSuffix);
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })

  const upload = multer({ storage: storage }); // multer configuration


    export default upload; //exporting the middleware