//const { mongooseToObject } = require('../../util/mongoose');

const user = require('../models/user');
const upload = require('../../config/upload');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const { sendResetPasswordEmail } = require('../../util/sendMail');

const jwt = require('jsonwebtoken');
const JWT_SECRET = 'hello_world_2112205';

class SignController {
    //[POST] Dang ky
    async register(req, res) {
        try {
            // Xử lý phần upload ảnh với Multer
            upload.single('avatar')(req, res, async (err) => {
                if (err) {
                    return res
                        .status(400)
                        .json({ message: 'Lỗi khi tải lên ảnh!' });
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
                    res.status(400).json({
                        message:
                            'Email không hợp lệ. Vui lòng nhập đúng định dạng email.',
                    });
                }

                let existingUser = await user.findOne({ email: email });
                if (existingUser) {
                    return res
                        .status(400)
                        .json({ message: 'Email người sử dụng đã tồn tại!' });
                }

                // Tạo đối tượng người dùng mới
                const newUser = new user({
                    name,
                    email,
                    password,
                    bio,
                    avatar: req.file
                        ? {
                              data: req.file.buffer,
                              contentType: req.file.mimetype,
                          }
                        : null,
                });

                await newUser.save();

                res.status(201).json({ message: 'Đăng ký thành công!' });
            });
        } catch (error) {
            res.status(500).json({ message: 'Lỗi máy chủ nội bộ!' });
        }
    }

    //[POST] Dang nhap
    async login(req, res) {
        try {
            const email = req.body.email;
            const password = req.body.password;

            if (!email || !password) {
                res.status(400).json({
                    message: 'Email và mật khẩu không thể để trống!',
                });
            }

            const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

            if (!re.test(String(email).toLowerCase())) {
                res.status(400).json({
                    message:
                        'Email không hợp lệ. Vui lòng nhập đúng định dạng email.',
                });
            }

            let existingUser = await user.findOne({ email: email });
            if (!existingUser) {
                res.status(400).json({
                    message: 'Không tồn tại email người dùng!',
                });
            }

            const isMatch = await existingUser.comparePassword(password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Sai mật khẩu!' });
            }

            //trong token da co id nguoi dung
            const token = jwt.sign({ userId: existingUser._id }, JWT_SECRET, {
                expiresIn: '1h',
            });

            res.json({ message: 'Đăng nhập thành công!', token });
        } catch (error) {
            res.status(500).json({ message: 'Lỗi máy chủ nội bộ!' });
        }
    }

    //[POST] /sign/forgotPw
    async forgotPw(req, res) {
        const { email } = req.body;
        try {
            if (!email) {
                res.status(400).json({ message: 'Email không thể để trống!' });
            }

            const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

            if (!re.test(String(email).toLowerCase())) {
                res.status(400).json({
                    message:
                        'Email không hợp lệ. Vui lòng nhập đúng định dạng email.',
                });
            }

            const User = await user.findOne({ email });
            if (!User)
                return res
                    .status(400)
                    .json({ message: 'Người dùng không tồn tại' });

            const resetToken = crypto.randomBytes(32).toString('hex');
            User.resetToken = resetToken;
            User.resetTokenExpire = Date.now() + 3600000; // Token có hiệu lực 1 giờ
            await User.save();

            const emailResponse = await sendResetPasswordEmail(
                User.email,
                resetToken,
            );
            if (!emailResponse.success) {
                res.status(500).json({
                    message: 'Đã gửi email với mã đặt lại mật khẩu',
                    response: emailResponse.response,
                });
            }

            return res.json({
                message: 'Đã gửi email với mã đặt lại mật khẩu',
                response: emailResponse.response,
            });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Lỗi máy chủ' });
        }
    }

    //[POST] /sign/resetPw
    async resetPw(req, res) {
        const { email, token, newPassword } = req.body;
        try {
            const User = await user.findOne({
                email,
                resetToken: token,
                resetTokenExpire: { $gt: Date.now() },
            });

            if (!User)
                return res
                    .status(400)
                    .json({ message: 'Token không hợp lệ hoặc đã hết hạn' });

            User.password = newPassword;
            User.resetToken = undefined;
            User.resetTokenExpire = undefined;
            await User.save();

            res.json({ message: 'Mật khẩu đã được thay đổi' });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: 'Lỗi máy chủ' });
        }
    }
}

module.exports = new SignController();
