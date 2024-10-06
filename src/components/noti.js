import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import './home.css';
import { Link } from 'react-router-dom';

const Noti = () => {
    const notifications = [
        { id: 1, title: 'Tạo sự kiện thành công', message: 'Bạn đã tạo thành công Sự kiện 1' },
        { id: 2, title: 'Tạo sự kiện thành công', message: 'Bạn đã tạo thành công Sự kiện 2' },
        { id: 3, title: 'Huỷ sự kiện thành công', message: 'Bạn đã huỷ thành công Sự kiện 3' },
        { id: 4, title: 'Thay đổi về sự kiện bạn tham gia', message: 'Sự kiện 4 đã có những cập nhật mới' },
        { id: 5, title: 'Thay đổi về sự kiện bạn tham gia', message: 'Sự kiện 5 đã bị huỷ' },
    ];

    return (
        <div>
            <header>
                <div className="header d-flex justify-content-between align-items-center">
                    <div className="logo mx-3">
                        <img src="eventure.png" alt="Logo" height="40" />
                    </div>
                    <input className=" form-control mx-3"
                        style={{ borderRadius: "20px", width: "400px" }}
                        type="search"
                        placeholder="Tìm kiếm sự kiện"
                        aria-label="Search"
                    />
                    <button
                        style={{ borderRadius: "20px", color: "white", backgroundColor: "black", fontFamily: "verdana", width: "70px", alignContent: "center", justifyContent: "center", paddingInline: "20px" }}
                        className="btn btn-outline-success"
                        type="submit">
                        Tìm
                    </button>
                    <nav>
                        <ul className="nav d-flex">
                            <Link className="nav-link" to="/home"><img src="home.svg" alt="Trang chủ" /></Link>
                            <Link className="nav-link" to="/account"><img src="user-circle.svg" alt="Tài khoản" /></Link>
                            <Link className="nav-link" to="/myevent"><img src="star.svg" alt="Sự kiện" /></Link>
                            <Link className="nav-link" to="/noti"><img src="bell.svg" alt="Thông Báo" /></Link>
                            <Link className="nav-link" to="/create"><img src='plus.svg' alt="Tạo sự kiện" /></Link>
                        </ul>
                    </nav>
                </div>
            </header>
            <div className='justify-content-center'>
                <div style={{ maxWidth: '600px', margin: 'auto', padding: '20px' }}>
                    <h2 style={{
                        display: "flex", margin: "20px", marginTop: "50px", fontWeight: "bold", borderBottom: "3px solid #f9a603",
                        paddingBottom: "10px", marginBottom: '40px'
                    }}>Danh sách thông báo</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        {notifications.map((notification) => (
                            <div key={notification.id} style={{
                                border: '1px solid #ddd',
                                borderRadius: '5px',
                                padding: '15px',
                                backgroundColor: '#f9f9f9'
                            }}>
                                <h4>{notification.title}</h4>
                                <p>{notification.message}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Noti;