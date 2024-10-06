import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './logreg.css';

let sampleUsers = []; // Mảng để lưu thông tin người dùng


const Register = ({ onSwitchToLogin }) => {
    const navigate = useNavigate();
    const [inputs, setInputs] = useState({
        email: '',
        password: '',
        name: '',
        des: '',
        image: null,
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setInputs(prevInputs => ({
            ...prevInputs,
            [name]: value,
        }));
    };

    const handleFileChange = (event) => {
        setInputs(prevInputs => ({
            ...prevInputs,
            avatar: event.target.files[0],
        }));
    };

    const handleRegister = (event) => {
        event.preventDefault();
        // Kiểm tra xem email đã tồn tại chưa
        const userExists = sampleUsers.some(user => user.email === inputs.email);
        if (userExists) {
            alert('Email đã tồn tại. Vui lòng sử dụng email khác.');
            return;
        }
        // Lưu thông tin người dùng vào mảng
        sampleUsers.push({
            email: inputs.email,
            name: inputs.name,
            password: inputs.password,
            des: inputs.des,
            image: inputs.image,
        });

        console.log('Register success:', inputs);
        alert('Đăng ký thành công');
        window.location.reload();
    };


    return (
        <div>
            <header className="pt-3">
                <div className="container d-flex justify-content-between align-items-center">
                    <img src="eventure.png" alt="Logo" height="40" />
                </div>
            </header>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6" style={{ padding: '0px 30px' }}>
                        <h1 className="text-center" style={{ paddingTop: '70px' }}>Tạo một tài khoản mới với Eventure</h1>
                        <form onSubmit={handleRegister}>
                            <div className="mb-3">
                                <label className='form-label d-block' style={{ paddingInline: '10px' }} >Tên người dùng</label>
                                <input
                                    type="text"
                                    className="typeplace"
                                    name='name'
                                    style={{ marginInline: ' 30px', width: '450px' }}
                                    value={inputs.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className='form-label d-block' style={{ paddingInline: '10px' }} >Email</label>
                                <input
                                    type="email"
                                    className="typeplace"
                                    name='email'
                                    style={{ marginInline: ' 30px', width: '450px' }}
                                    value={inputs.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label d-block" style={{ paddingInline: '10px' }}>Mật khẩu</label>
                                <input
                                    type="password"
                                    name='password'
                                    className="typeplace"
                                    style={{ marginInline: ' 30px', width: '450px' }}
                                    value={inputs.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label d-block" style={{ paddingInline: '10px' }}>Mô tả</label>
                                <textarea
                                    name="des"
                                    className='typeplace'
                                    style={{ marginInline: ' 30px', width: '450px' }}
                                    value={inputs.description}
                                    onChange={handleChange}
                                />
                            </div>
                            <div>
                                <label>Chọn ảnh đại diện</label>
                                <input
                                    type="file"
                                    name='image'
                                    style={{ padding: "20px" }}
                                    onChange={handleFileChange}
                                    accept="image/*"

                                />
                            </div>
                            <div className='button-click'>
                                <button type="submit" className="btn btn-primary" >Đăng Ký</button>
                            </div>
                        </form>
                        <small className="d-block text-center" style={{ padding: '20px' }}>
                            Đã có tài khoản? <button className="btn btn-link" onClick={onSwitchToLogin}>Đăng Nhập</button>
                        </small>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
