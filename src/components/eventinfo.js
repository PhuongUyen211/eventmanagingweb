import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import './home.css';
import { Link, useParams } from 'react-router-dom';
//import { getEvents } from './home';
import { events } from './home';

const sampleComments = [
    { userid: 1, content: "Bình luận 1", createAt: new Date() },
    { userid: 2, content: "Bình luận 2", createAt: new Date() },
];

const Eventinfo = () => {
    const { id } = useParams(); //truyền id sự kiện

    // State để quản lý tham gia và bình luận
    const [event, setEvent] = useState(null);
    const [isJoined, setIsJoined] = useState(false);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Tìm sự kiện trong mảng sự kiện mẫu
        const foundEvent = events.find(event => event.id === parseInt(id));
        if (foundEvent) {
            setEvent(foundEvent);
        } else {
            setError('Không tìm thấy sự kiện.');
        }
        setLoading(false);
    }, [id]);


    /*
    // Hàm để lấy thông tin sự kiện từ API
    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const response = await axios.get(`/api/events/${id}`); // Thay đổi đường dẫn này thành URL API của bạn
                setEvent(response.data);
            } catch (err) {
                setError('Không thể tải thông tin sự kiện.');
            } finally {
                setLoading(false);
            }
        };

        fetchEvent();
    }, [id]);
    */
    /*
    useEffect(() => {
        // Hàm để lấy bình luận từ API
        const fetchComments = async () => {
            try {
                // Thay đổi URL này thành URL API của bạn
                const response = await axios.get(`/api/comments?eventid=${id}`); // Thay đổi đường dẫn này thành URL API của bạn
                setComments(response.data);
            } catch (err) {
                console.error('Không thể tải bình luận.');
            }
        };

        fetchComments();
    }, [id]);
    

    const handleJoin = async () => {
        if (isJoined) {
            // Huỷ tham gia
            await axios.delete(`/api/join?userid=1&eventid=${id}`); // Thay userid = 1 bằng giá trị thực tế
            setIsJoined(false);
        } else {
            // Tham gia
            await axios.post(`/api/join`, { userid: 1, eventid: id }); // Thay userid = 1 bằng giá trị thực tế
            setIsJoined(true);
        }
    };


    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (newComment.trim()) {
            // Gửi bình luận tới server
            await axios.post(`/api/comments`, { userid: 1, eventid: id, content: newComment }); // Thay userid = 1 bằng giá trị thực tế
            setComments([...comments, { userid: 1, content: newComment, createAt: new Date() }]); // Giả lập thêm bình luận
            setNewComment('');
        }
    };*/
    const handleJoin = () => {
        /*setIsJoined(prev => !prev);*/
        if (isJoined) {
            alert('Huỷ tham gia sự kiện thành công!');
            setIsJoined(prev => !prev);
        } else {
            alert('Tham gia sự kiện thành công!');
            setIsJoined(prev => !prev);
        }
    };

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        if (newComment.trim()) {
            // Giả lập thêm bình luận vào mảng
            setComments([...comments, { userid: 1, content: newComment, createAt: new Date() }]);
            setNewComment('');
        }
    };

    if (loading) return <p>Đang tải...</p>;
    if (error) return <p>{error}</p>;
    if (!event) return <h2>Không tìm thấy sự kiện</h2>;

    return (
        <div>
            <header>
                <div className="header d-flex justify-content-between align-items-center">
                    <div className="logo mx-3">
                        <img src="../eventure.png" alt="Logo" height="40" />
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
                            <Link className="nav-link" to="/home"><img src="../home.svg " alt="Trang chủ" /></Link>
                            <Link className="nav-link" to="/account"><img src="../user-circle.svg" alt="Tài khoản" /></Link>
                            <Link className="nav-link" to="/myevent"><img src="../star.svg" alt="Sự kiện" /></Link>
                            <Link className="nav-link" to="/noti"><img src="../bell.svg" alt="Thông Báo" /></Link>
                            <Link className="nav-link" to="/create"><img src='../plus.svg' alt="Tạo sự kiện" /></Link>
                        </ul>
                    </nav>
                </div>
            </header>
            <div className='container justify-content-center mb-5'>
                <div className='container justify-content-center mb-5'>
                    <h3 style={{
                        display: "flex", margin: "20px", marginTop: "50px", fontWeight: "bold", borderBottom: "3px solid #f9a603",
                        paddingBottom: "10px"
                    }} className="event-info">{event.title}</h3>
                    <img src={`${process.env.PUBLIC_URL}/${event.image}`} alt={event.title} style={{ height: "380px", width: "500px", margin: "20px auto", display: "block", borderRadius: '5px', paddingTop: '20px' }} />
                    <div className="event-body">
                        <h4 className='small-underline'>Địa Điểm</h4>
                        <p style={{ marginLeft: '40px' }}>{event.location}</p>
                        <h4 className='small-underline'>Thời Gian</h4>
                        <p style={{ marginLeft: '40px' }}>{event.date}</p>
                        <h4 className='small-underline'>Host</h4>
                        <p style={{ marginLeft: '40px' }}>{event.host}</p>
                        <h4 className='small-underline'>Lĩnh Vực</h4>
                        <p style={{ marginLeft: '40px' }}>{event.topic}</p>
                        <h4 className='small-underline'>Mô Tả</h4>
                        <p style={{ marginLeft: '40px' }}>{event.des}</p>
                    </div>
                    <div className='d-flex justify-content-center'>
                        <button onClick={handleJoin} className="btn btn-primary">
                            {isJoined ? 'Huỷ Tham Gia' : 'Tham Gia'}
                        </button>
                    </div>
                    <div className="comments-section mt-4">
                        <h4 className='small-underline'>Bình luận</h4>
                        <div style={{ marginLeft: "40px" }}>
                            {comments.map((comment, index) => (
                                <div key={index} className="comment" style={{ paddingBottom: '20px' }}>
                                    <strong>Người dùng {comment.userid}:</strong>
                                    <p>{comment.content}</p>
                                    <small style={{ float: 'right' }}>{new Date(comment.createAt).toLocaleString()}</small>
                                </div>
                            ))}
                        </div>
                        <form onSubmit={handleCommentSubmit}>
                            <textarea style={{ marginLeft: '40px', width: '500px' }}
                                type="text"
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                placeholder="Thêm bình luận..."
                                className="form-control mt-2"
                            />
                            <div >
                                <button style={{ borderRadius: '20px', padding: '7px 20px', marginLeft: '40px' }} type="submit" className="btn btn-success mt-2">Gửi</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Eventinfo