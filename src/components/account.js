import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

const UserProfile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [userInfo, setUserInfo] = useState({
        name: 'Nguyễn Văn A',
        email: 'admin@gmail.com',
        description: 'Yêu thích công nghệ và lập trình.',
        avatar: 'avatarex.webp',
    });

    const [tempInfo, setTempInfo] = useState({ ...userInfo });

    const handleEdit = () => {
        setUserInfo(tempInfo);
        setIsEditing(false);
        alert('Chỉnh sửa thông tin thành công!');
    };

    const handleCancel = () => {
        setTempInfo({ ...userInfo });
        setIsEditing(false);
    };

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

            <div className="container justify-content-center">
                <h3 style={{
                    display: "flex", margin: "20px", marginTop: "50px", fontWeight: "bold", borderBottom: "3px solid #f9a603",
                    paddingBottom: "10px"
                }}>Thông tin tài khoản</h3>
                <div style={{ border: "1px solid #aaa", borderRadius: "5px", padding: "20px" }} className="container mt-5 justify-content-center">
                    <div className="d-flex align-items-center mr-4 mt-3">
                        <img
                            src={userInfo.avatar}
                            alt="Avatar"
                            className="rounded-circle"
                            width="150"
                            height="150"
                        />
                        <div>
                            <h2 style={{ marginLeft: "20px" }}>
                                {isEditing ? (
                                    <input className='typeplace'
                                        type='text'
                                        style={{ width: '300px', marginLeft: '0px' }}
                                        value={tempInfo.name}
                                        onChange={(e) => setTempInfo({ ...tempInfo, name: e.target.value })}
                                        placeholder='Nhập tên người dùng'
                                        required
                                    />
                                ) : (
                                    userInfo.name
                                )}
                            </h2>
                        </div>
                    </div>
                    <div style={{ marginTop: "200px", marginLeft: "30px" }} className="mt-4">
                        <p>
                            <strong>Email: </strong>
                            {tempInfo.email}
                        </p>
                    </div>
                    <div style={{ marginTop: "200px", marginLeft: "30px" }} className="mt-4">
                        <p>
                            <strong>Mô tả:</strong> {isEditing ? (
                                <input
                                    type="text"
                                    className=" typeplace"
                                    style={{ width: '300px', marginLeft: '0px' }}
                                    value={tempInfo.description}
                                    onChange={(e) => setTempInfo({ ...tempInfo, description: e.target.value })}
                                    placeholder="Nhập mô tả của bạn"
                                />
                            ) : (
                                userInfo.description
                            )}
                        </p>
                    </div>
                    <div>
                        {isEditing ? (
                            <>
                                <button style={{ borderRadius: "20px" }} className="btn btn-success m-4 px-4" onClick={handleEdit}>Hoàn tất</button>
                                <button style={{ borderRadius: "20px" }} className="btn btn-secondary m-4 px-4" onClick={handleCancel}>Huỷ</button>
                            </>
                        ) : (
                            <>
                                <div className='form-inline'>
                                    <button className="btn btn-primary m-4" onClick={() => setIsEditing(true)}>Chỉnh sửa</button>
                                    <button style={{ borderRadius: "20px" }} className="btn btn-danger m-4 px-4" onClick={() => alert('Đã xóa tài khoản!')}>Xoá</button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div >
        </div>
    );
};

export default UserProfile;
