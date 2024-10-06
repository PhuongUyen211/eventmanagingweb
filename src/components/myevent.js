import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import './home.css';
import { Link } from 'react-router-dom';

const MyEvent = () => {
    const events = [
        {
            id: 1,
            title: 'Sự Kiện 1',
            location: 'Hà Nội',
            date: '10/10/2024',
            host: 'Công Ty ABC',
            image: 'badminton.jpg',
            type: 'Họp mặt'
        },
        {
            id: 2,
            title: 'Sự Kiện 2',
            location: 'TP. Hồ Chí Minh',
            date: '15/10/2024',
            host: 'Công Ty XYZ',
            image: 'party.webp',
            type: 'Tiệc',
            topic: ''
        },
        {
            id: 3,
            title: 'Sự kiện 3',
            location: 'Hà Nội',
            date: '24/11/2024',
            host: 'Trường DEF',
            image: 'celebration.jpg',
            type: 'Kỷ niệm'
        },
    ];
    {/*//lấy dữ liệu từ api
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get('API_ENDPOINT'); // Thay thế bằng URL API của bạn
                setEvents(response.data); // Giả định API trả về dữ liệu là mảng các sự kiện
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu sự kiện:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);
        if (loading) {
        return <div>Loading...</div>; // Hoặc bất kỳ thông báo loading nào bạn muốn
    }

        */}

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
            <div className='container justify-content-center'>
                <h3 style={{
                    display: "flex", margin: "20px", marginTop: "50px", fontWeight: "bold", borderBottom: "3px solid #f9a603",
                    paddingBottom: "10px"
                }}>Sự kiện đã tham gia</h3>
                <div className="container">
                    <div className="row">
                        {/*events}.filter(event => event.type === 'tham gia').map(event => (   // khi lấy dữ liệu từ api thì dùng dòng này thay cho dòng dưới*/}
                        {events.map(event => (
                            <div className="col-md-4 event-card" key={event.id}>
                                <div style={{ margin: "20px" }} className="card">
                                    <img src={event.image} className="card-img-top" alt={event.title} />
                                    <div className="card-body">
                                        <Link to={`/eventinfo/${event.id}`} style={{ textDecoration: 'none', color: 'black', }}>
                                            <h5 className="card-title" style={{ fontWeight: "bold" }}  >{event.title}</h5>
                                        </Link>
                                        <p className="card-text">Địa Điểm: {event.location}</p>
                                        <p className="card-text">Thời Gian: {event.date}</p>
                                        <p className="card-text">Host: {event.host}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="container justify-content-center">
                <h3 style={{
                    display: "flex", margin: "20px", marginTop: "50px", fontWeight: "bold", borderBottom: "3px solid #f9a603",
                    paddingBottom: "10px"
                }}>Sự kiện đã tạo</h3>
                <div className="row">
                    {/*events}.filter(event => event.type === 'tạo').map(event => (   // khi lấy dữ liệu từ api thì dùng dòng này thay cho dòng dưới*/}
                    {events.map(event => (
                        <div className="col-md-4 event-card" key={event.id}>
                            <div style={{ margin: "30px" }} className="card">
                                <img src={event.image} className="card-img-top" alt={event.title} />
                                <div className="card-body">
                                    <Link to={`/eventinfo/${event.id}`} style={{ textDecoration: 'none', color: 'black', }}>
                                        <h5 className="card-title" style={{ fontWeight: "bold" }}  >{event.title}</h5>
                                    </Link>
                                    <p className="card-text">Địa Điểm: {event.location}</p>
                                    <p className="card-text">Thời Gian: {event.date}</p>
                                    <p className="card-text">Host: {event.host}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
export default MyEvent