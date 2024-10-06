import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import './home.css';
import { Link } from 'react-router-dom';

const events = [
    {
        id: 1,
        title: 'Sự Kiện 1',
        location: 'Hà Nội',
        date: '10/10/2024',
        host: 'Công Ty ABC',
        topic: 'Thể thao',
        image: 'badminton.jpg',
        des: 'Sự kiện thể thao hấp dẫn nhất năm.'
    },
    {
        id: 2,
        title: 'Sự Kiện 2',
        location: 'TP. Hồ Chí Minh',
        date: '15/10/2024',
        host: 'Công Ty XYZ',
        topic: 'Giải trí',
        image: 'party.webp',
        des: 'Tiệc mừng cho nhân viên công ty.'
    },
    {
        id: 3,
        title: 'Sự kiện 3',
        location: 'Hà Nội',
        date: '24/11/2024',
        host: 'Trường DEF',
        topic: 'Kỷ niệm',
        image: 'celebration.jpg',
        des: 'Kỷ niệm 10 năm thành lập trường DEF.'
    },
    {
        id: 4,
        title: 'Sự Kiện 4',
        location: 'Đà Nẵng',
        date: '18/10/2024',
        host: 'Công Ty MNO',
        topic: 'Âm nhạc',
        image: 'yearend.jpg',
        des: 'Lễ hội cuối năm tuyệt vời tại Đà Nẵng.'
    },
    {
        id: 5,
        title: 'Sự Kiện 5',
        location: 'Cần Thơ',
        date: '12/11/2024',
        host: 'Công Ty QRS',
        type: 'Hội nghị',
        topic: 'Giáo dục',
        image: 'conference.jpg',
        des: 'Hội nghị giáo dục quốc gia tại Cần Thơ.'
    },
    {
        id: 6,
        title: 'Sự Kiện 6',
        location: 'Đà Lạt',
        date: '05/12/2024',
        host: 'Công Ty TUV',
        type: 'Lễ hội',
        topic: 'Âm nhạc',
        image: 'musicfestival.jpg',
        des: 'Lễ hội âm nhạc lớn tại Đà Lạt.'
    },
    {
        id: 7,
        title: 'Sự Kiện 7',
        location: 'Điện Biên',
        date: '20/01/2025',
        host: 'Công Ty WXY',
        type: 'Họp mặt',
        topic: 'Giải trí',
        image: 'reunion.jpg',
        des: 'Họp mặt cộng đồng tại Điện Biên.'
    },
    {
        id: 8,
        title: 'Sự Kiện 8',
        location: 'Hải Phòng',
        date: '28/02/2025',
        host: 'Công Ty ABCD',
        type: 'Tiệc',
        topic: 'Ẩm thực',
        image: 'foodparty.jpeg',
        des: 'Tiệc ẩm thực tại Hải Phòng với nhiều món ngon.'
    },
    {
        id: 9,
        title: 'Sự Kiện 9',
        location: 'Hà Nội',
        date: '30/03/2025',
        host: 'Công Ty EFG',
        type: 'Kỷ niệm',
        topic: 'Thể thao',
        image: 'sportscelebration.jpg',
        des: 'Kỷ niệm thành công của đội thể thao quốc gia.'
    },
    {
        id: 10,
        title: 'Sự Kiện 10',
        location: 'Đà Nẵng',
        date: '15/04/2025',
        host: 'Công Ty HIJ',
        type: 'Hội nghị',
        topic: 'Giáo dục',
        image: 'educationconference.jpg',
        des: 'Hội nghị giáo dục với sự tham gia của nhiều diễn giả nổi tiếng.'
    }
];
export { events };

const Home = () => {

    const [currentPage, setCurrentPage] = useState(1);
    const eventsPerPage = 9;
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    // Tính toán chỉ số của sự kiện bắt đầu và kết thúc
    const indexOfLastEvent = currentPage * eventsPerPage;
    const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
    const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);

    // Chuyển trang
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Số trang
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(events.length / eventsPerPage); i++) {
        pageNumbers.push(i);
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
            <div className="container my-4">
                <div className="row">
                    <div className="col-md-4">
                        <select className="form-control" style={{ width: '330px', paddingBlock: '10px' }}>
                            <option value="" disabled selected>Địa điểm</option>
                            <option>Hà Nội</option>
                            <option>TP. Hồ Chí Minh</option>
                            <option>Đà Nẵng</option>
                            <option>Cần Thơ</option>
                            <option>Điện Biên</option>
                            <option>Đà Lạt</option>
                            <option>Hải Phòng</option>
                        </select>
                    </div>
                    <div className='col-md-4 d-flex align-items-center' style={{ border: '1px solid #d6d6d6', borderRadius: '10px', width: '350px', paddingInline: '0px', marginLeft: '10px' }} >
                        <div >
                            <input
                                type="date"
                                className="form-control"
                                style={{ width: '150px', border: 'none' }}
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                            />
                        </div>
                        <p style={{ paddingTop: '2px', margin: '0px', fontWeight: 'bold' }}>-</p>
                        <div>
                            <input
                                type="date"
                                className="form-control"
                                style={{ width: '150px', border: 'none', marginRight: '0px', marginLeft: '15px' }}
                                value={endDate}
                                onChange={(e) => {
                                    const selectedEndDate = e.target.value;
                                    // Kiểm tra nếu ngày kết thúc nhỏ hơn ngày bắt đầu
                                    if (new Date(selectedEndDate) < new Date(startDate)) {
                                        alert("Ngày kết thúc không thể nhỏ hơn ngày bắt đầu.");
                                    } else {
                                        setEndDate(selectedEndDate);
                                    }
                                }}
                            />
                        </div>
                    </div>
                    <div className="col-md-4" style={{ marginLeft: '20px' }}>
                        <select className='form-control' style={{ width: '330px' }}>
                            <option value="" disabled selected>Lĩnh Vực</option>
                            <option>Giải Trí</option>
                            <option>Giáo Dục</option>
                            <option>Ẩm Thực</option>
                            <option>Thể Thao</option>
                            <option>Âm Nhạc</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="row">
                    {currentEvents.map(event => (
                        <div className="col-md-4 event-card" key={event.id}>
                            <div style={{ margin: "20px" }} className="card">
                                <img src={event.image} className="card-img-top" alt={event.title} />
                                <div className="card-body">
                                    <Link to={`/eventinfo/${event.id}`} style={{ textDecoration: 'none', color: 'black' }}>
                                        <h5 style={{ fontWeight: "bold" }} className="card-title">{event.title}</h5>
                                    </Link>
                                    <p className="card-text">Địa Điểm: {event.location}</p>
                                    <p className="card-text">Thời Gian: {event.date}</p>
                                    <p className="card-text">Host: {event.host}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div style={{ justifyContent: 'center', display: 'flex' }}>
                    <nav>
                        <ul className="pagination">
                            {pageNumbers.map(number => (
                                <li key={number} className="page-item">
                                    <a onClick={() => paginate(number)} href="#" className="page-link">
                                        {number}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </div>
        </div >
    );
}

export default Home;