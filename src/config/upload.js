const multer = require('multer');

// Sử dụng memory storage để lưu trong bộ nhớ tạm
//Du lieu file se duoc luu trg doi th buffer cua file
const storage = multer.memoryStorage();
//khoi tao multer voi cau hinh luu tru da xac dinh: storage
const upload = multer({ storage: storage });

//Khi nguoi dung tai anh len, anh dc luu vao req.file.buffer

module.exports = upload;
