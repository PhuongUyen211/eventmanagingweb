const mongoose = require('mongoose');
//const slugify = require('slugify');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const user = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        bio: { type: String },
        avatar: { data: Buffer, contentType: String },
        resetToken: { type: String },
        resetTokenExpire: { type: Date },
    },
    {
        timestamps: true,
    },
);

user.pre('save', async function (next) {
    //Xem password co bi sua khong
    if (this.isModified('password')) {
        //ma hoa mat khau
        this.password = await bcrypt.hash(this.password, 10);
    }
    //tiep tuc luu tai lieu khi hoan tat ma hoa
    next();
});

//so sanh mk ms va mk trong csdl
user.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model('user', user);
