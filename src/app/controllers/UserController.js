const user = require('../models/user');
const event = require('../models/event');

const upload = require('../../config/upload');
const eventController = require('./EventController');

const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const JWT_SECRET = 'hello_world_2112205';

class UserController {
    async editProfile(req, res) {
        upload.single('avatar')(req, res, async function (err) {
            if (err) {
                return res.status(400).json({ message: err.message });
            }

            try {
                // Tìm nguoi dung hiện tại
                const currentUser = await user.findById(req.user.id);
                if (!currentUser) {
                    return res
                        .status(404)
                        .json({ message: 'User không tồn tại' });
                }

                const { name, email, password, bio } = req.body;

                if (!name || !password || !email) {
                    return res
                        .status(400)
                        .json({
                            message:
                                'Tên, email và mật khẩu không thể để trống!',
                        });
                }

                const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

                if (!re.test(String(email).toLowerCase())) {
                    return res
                        .status(400)
                        .json({
                            message:
                                'Email không hợp lệ. Vui lòng nhập đúng định dạng email.',
                        });
                }

                let existingUser = await user.findOne({ email: email });
                if (existingUser._id != currentUser._id ) {
                    return res
                        .status(400)
                        .json({ message: 'Email người sử dụng đã tồn tại!' });
                }

                const updateData = {
                    name,
                    email,
                    password,
                    bio,
                    avatar: currentUser.avatar,
                };

                // Nếu có ảnh mới, cập nhật hình ảnh
                if (req.file && req.file.buffer) {
                    updateData.avatar = req.file.buffer;
                }

                for (const key in updateData) {
                    if (updateData.hasOwnProperty(key)) {
                        currentUser[key] = updateData[key];
                    }
                }

                await currentUser.save();

                res.json('Cập nhật thành công!');
            } catch (error) {
                console.error(error);
                res.status(500).json({ message: 'Server error' });
            }
        });
    }

    async deleteUser(req, res) {
        try {
            const userId = req.user.id; 
            
            // Tìm tất cả sự kiện do người dùng tạo
            const userEvents = await event.find({ host: userId });
    
            // Xóa tất cả các sự kiện do người dùng tạo
            for (let Event of userEvents) {
                // Giả lập request cho hàm cancelEvent
                const fakeReq = { params: { id: Event._id } };
                const fakeRes = {
                    status: (statusCode) => ({
                        json: (response) => {
                            // Ném lỗi ra ngoài nếu hàm cancelEvent trả về mã lỗi (>= 400)
                            if (statusCode >= 400) {
                                throw new Error(`Cancel event failed with status ${statusCode}: ${response.message}`);
                            }
                            console.log(`Status: ${statusCode}`, response);
                        }
                    }),
                    json: (response) => { // Thêm phương thức json vào đây
                        console.log("FakeRes json response:", response);
                    }
                };
                // Nếu có lỗi trong cancelEvent, nó sẽ thoát khỏi hàm và nhảy vào catch
                await eventController.cancelEvent(fakeReq, fakeRes); 
            }
    
            // Xóa tài khoản người dùng
            await user.findByIdAndDelete(userId);
        
            return res.status(200).json({ message: 'Tài khoản và các sự kiện liên quan đã được xóa.' });
        } catch (error) {
            console.error('Lỗi trong quá trình xóa tài khoản hoặc sự kiện:', error);
            return res.status(500).json({ message: 'Có lỗi xảy ra khi xóa tài khoản hoặc sự kiện.', error });
        }
    }
    


}

module.exports = new UserController();
