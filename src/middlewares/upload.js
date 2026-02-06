const multer = require("multer");
const memoryStorage = multer.memoryStorage();
const upload = multer({
  storage: memoryStorage,
  limits: { fileSize: 5 * 1024 * 1024 },
});

module.exports.uploadSingle = upload.single("image");
module.exports.uploadMultiple = upload.array("images", 10);
