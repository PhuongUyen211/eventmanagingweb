// components/ChangePassword.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './home.css';

const ChangePassword = () => {
    const [email, setEmail] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [message, setMessage] = useState('');

    const navigate = useNavigate();
    const [step, setStep] = useState(1); // Trạng thái bước hiện tại

    const handleEmailSubmit = (e) => {
        e.preventDefault();
        // Chuyển sang bước nhập mã xác nhận và mật khẩu mới
        setStep(2);
    };

    const handleChangePassword = (e) => {
        e.preventDefault();
        // Hiển thị thông báo thành công
        setMessage('Đổi mật khẩu thành công!');
        setTimeout(() => {
            navigate('/'); // Chuyển hướng về trang đăng nhập sau 2 giây
        }, 2000);
    };

    return (
        <div>
            <header className="pt-3">
                <div className="container d-flex justify-content-between align-items-center">
                    <img src="eventure.png" alt="Logo" height="40" />
                </div>
            </header>
            <div className="container">
                <div className="row justify-content-center" >
                    <div className="col-md-6 " style={{ padding: '0px 30px' }}>
                        <h1 className="text-center" style={{ paddingTop: '70px' }}>Thay đổi mật khẩu</h1>
                        {message && <div className="alert alert-success">{message}</div>}
                        {step === 1 && (
                            <form onSubmit={handleEmailSubmit} style={{
                                margin: 'auto', display: "flex",
                                flexDirection: "column",
                                justifyContent: 'center',
                                gap: "10px"
                            }}>
                                {/*{errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                            {successMessage && <div className="alert alert-success">{successMessage}</div>}*/}
                                <div className="mb-3">
                                    <label className="form-label d-block" style={{ paddingInline: '10px' }}>Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        style={{ marginInline: ' 30px', width: '450px' }}
                                        required
                                    />
                                </div>
                                <div className='button-click' style={{ marginBottom: '0px' }}>
                                    <button type="submit" className="btn btn-primary">Tiếp theo</button>
                                </div>
                            </form>
                        )}
                        {step === 2 && (
                            <form onSubmit={handleChangePassword} style={{
                                margin: 'auto', display: "flex",
                                flexDirection: "column",
                                justifyContent: 'center',
                                gap: "10px"
                            }}>
                                <div className="mb-3">
                                    <label className="form-label d-block" style={{ paddingInline: '10px' }}>Mã Xác Nhận</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={verificationCode}
                                        style={{ marginInline: ' 30px', width: '450px' }}
                                        onChange={(e) => setVerificationCode(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3" style={{ marginBottom: '0px' }}>
                                    <label className="form-label d-block" style={{ paddingInline: '10px' }}>Mật Khẩu Mới</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        value={newPassword}
                                        style={{ marginInline: ' 30px', width: '450px' }}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className='button-click' style={{ marginBottom: '0px' }}>
                                    <button type="submit" className="btn btn-primary">Hoàn tất</button>
                                </div>
                            </form>
                        )}
                        <small className="d-block text-center mt-3" onClick={() => navigate('/')} style={{ cursor: 'pointer', color: 'blue', padding: "0px" }}>Quay lại</small>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default ChangePassword;