const nodemailer = require('nodemailer');
require('dotenv').config();

const sendResetPasswordEmail = async (to, resetToken) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 587,
            secure: false, // true for port 465, false for other ports
            auth: {
                user: 'hauyen629@gmail.com', //send gmail address
                pass: 'rnpw uqum rxbq gpem', //app password from gmail account
            },
        });

        const mailOptions = {
            from: {
                name: 'Web event',
                address: 'hauyen629@gmail.com',
            },
            to: to, // list of receivers
            subject: 'Yêu cầu đặt lại mật khẩu', // Subject line
            text: `Bạn đã yêu cầu đặt lại mật khẩu. Vui lòng sử dụng mã sau để đổi mật khẩu: ${resetToken}\n\nNếu bạn không yêu cầu, vui lòng bỏ qua email này.`, // plain text body
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
        return { success: true, response: info.response };
    } catch (err) {
        console.error('Error sending email:', err);
        return { success: false, error: err };
    }
};

module.exports = {
    sendResetPasswordEmail,
};
