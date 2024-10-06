// components/Auth.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Login from './login';
import Register from './register';
import ChangePassword from './changepass';

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const navigate = useNavigate();

    const handleLoginSuccess = () => {
        navigate('/home');
    };

    const handleSwitchToRegister = () => {
        setIsLogin(false);
    };

    const handleSwitchToLogin = () => {
        setIsLogin(true);
    };

    const handleChangePassword = () => {
        navigate('/change-password');
    };

    return (
        <div className="auth-container">
            {isLogin ? (
                <Login
                    onLoginSuccess={handleLoginSuccess}
                    onSwitchToRegister={handleSwitchToRegister}
                    onChangePassword={handleChangePassword} />
            ) : (
                <Register onSwitchToLogin={handleSwitchToLogin} />
            )}
        </div>
    );
};

export default Auth;
