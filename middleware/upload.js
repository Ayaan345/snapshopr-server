const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, `prod_${Date.now()}${path.extname(file.originalname)}`)
});
const upload = multer({ storage });

module.exports = upload;