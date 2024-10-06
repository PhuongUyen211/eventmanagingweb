import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import './home.css';
import { Link } from 'react-router-dom';

const Create = ({ Create }) => {
    const [inputs, setInputs] = useState({
        eventname: '',
        location: '',
        date: '',
        topic: '',
        des: '',
        img: null
    });

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }));
    };
    const handleFileChange = (event) => {
        setInputs(values => ({ ...values, image: event.target.files[0] })); // Cập nhật trường ảnh
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();

        // Thêm các trường vào formData
        for (const key in inputs) {
            formData.append(key, inputs[key]);
        }


        alert('Tạo sự kiện thành công!');
    }

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
            <div style={{ maxWidth: '700px', margin: 'auto', padding: '20px' }} className='justify-content-center'>
                <h2 style={{
                    display: "flex", margin: "20px", marginTop: "50px", fontWeight: "bold", borderBottom: "3px solid #f9a603",
                    paddingBottom: "10px", justifyContent: 'center', marginBottom: '40px'
                }} className='d-flex justify-content-center mt-4'>Tạo sự kiện mới</h2>
                <div style={{ marginTop: "10px", display: 'flex', maxWidth: '700px', border: "1px solid #aaa", borderRadius: "5px" }} className='formal'>
                    <form onSubmit={handleSubmit} >
                        <label style={{ display: 'flex', marginBottom: '10px', alignItems: 'center', justifyContent: 'space-between' }}>Tên sự kiện
                            <input style={{ borderRadius: "7px", border: '1px solid', padding: "3px 10px", width: "350px" }}
                                type="text"
                                name="eventname"
                                value={inputs.eventname || ""}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <label style={{ display: 'flex', marginBottom: '10px', alignItems: 'center', justifyContent: 'space-between' }}>Địa điểm
                            <input style={{ borderRadius: "7px", border: '1px solid', padding: "3px 10px", width: "350px" }}
                                type="text"
                                name="location"
                                value={inputs.location || ""}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <label style={{ display: 'flex', marginBottom: '0px', alignItems: 'center', justifyContent: 'space-between' }}>Thời gian
                            <input style={{ borderRadius: "7px", border: '1px solid', padding: "3px 10px", width: "350px" }}
                                type="date"
                                name="date"
                                value={inputs.date || ""}
                                onChange={handleChange}
                                required
                            />
                        </label>
                        <p style={{ fontSize: '12px', paddingLeft: '120px' }}>Lưu ý: Bạn không thể chỉnh sửa ngày diễn ra sự kiện sau khi tạo</p>
                        <label style={{ display: 'flex', marginBottom: '10px', alignItems: 'center', justifyContent: 'space-between' }}>Lĩnh vực
                            <select style={{ borderRadius: "7px", border: '1px solid', padding: "3px 10px", width: "350px" }}
                                name="topic"
                                value={inputs.topic || ""}
                                onChange={handleChange}
                                required
                            >
                                <option value="" disabled selected>Chọn lĩnh vực</option>
                                <option value="giải trí">Giải Trí</option>
                                <option value="giáo dục">Giáo Dục</option>
                                <option value="ẩm thực">Ẩm thực</option>
                                <option value="thể thao">Thể Thao</option>
                                <option value="âm nhạc">Âm Nhạc</option>
                            </select>
                        </label>
                        <label style={{ display: 'flex', marginBottom: '10px', alignItems: 'center', justifyContent: 'space-between' }}>Mô tả
                            <textarea style={{ borderRadius: "7px", border: '1px solid', padding: "3px 10px", width: "350px" }}
                                type="text"
                                name="des"
                                value={inputs.des || ""}
                                onChange={handleChange}
                            />
                        </label>
                        <label style={{ display: 'flex', marginBottom: '10px', alignItems: 'center' }}>Chọn ảnh
                            <input style={{ paddingLeft: '25px' }}
                                type="file"
                                name="image"
                                accept="image/*" // Chỉ cho phép chọn ảnh
                                onChange={handleFileChange}
                            />
                        </label>
                        <div className='form-inline justify-content-center'>
                            <button style={{ width: "150px", marginInline: "30px" }} className='nav-link-ap btn-good' type="submit">Hoàn tất</button>
                        </div>
                    </form>
                </div>
            </div>
        </div >
    )
}

export default Create;