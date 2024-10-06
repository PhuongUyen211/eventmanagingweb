import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import './logreg.css';

let sampleUsers = [
    { email: 'admin@gmail.com', password: '123' },
    { email: 'user@example.com', password: 'password' },
];

const Login = ({ onSwitchToRegister, onChangePassword }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setErrorMessage('');//đặt lại thông báo lỗi

        const user = sampleUsers.find(user => user.email === email && user.password === password);

        if (user) {
            console.log('Login success:', user);
            navigate('/home');
            alert('Đăng nhập thành công!');
        } else {
            alert('Thông tin đăng nhập không chính xác. Vui lòng nhập lại!');
        }
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
                    <div className="col-md-6 " style={{ padding: '0px 30px' }}>
                        <h1 className="text-center" style={{ paddingTop: '70px' }}>Chào mừng đến với Eventure</h1>
                        <form style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: 'center',
                        }} onSubmit={handleLogin}>
                            <div className="mb-3 ">
                                <label className='form-label d-block' style={{ paddingInline: '10px' }} >Email</label>
                                <input
                                    type="email"
                                    className='typeplace'
                                    style={{ marginInline: ' 30px', width: '450px' }}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label d-block" style={{ paddingInline: '10px' }}>Mật khẩu</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    value={password}
                                    style={{ marginInline: ' 30px', width: '450px' }}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <div className='button-click' style={{ marginBottom: '0px' }}>
                                <button type="submit" className="btn btn-primary">Đăng Nhập</button>
                            </div>
                            <small className="d-block text-center" onClick={onChangePassword} style={{ cursor: 'pointer', color: 'blue', padding: '0px', margin: '0px' }}>Quên mật khẩu?</small>
                        </form>
                        <small className="d-block text-center" style={{ padding: '20px' }}>
                            Chưa có tài khoản? <button className="btn btn-link" onClick={onSwitchToRegister}>Đăng Ký</button>
                        </small>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
