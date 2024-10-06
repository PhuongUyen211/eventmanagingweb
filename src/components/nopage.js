import React from 'react';
import { Link } from 'react-router-dom';

const NoPage = () => {
    return (
        <div style={styles.container}>
            <h1 style={styles.header}>404 - Không tìm thấy trang</h1>
            <p>Xin lỗi, trang bạn đang tìm kiếm không tồn tại.</p>
            <Link to="/" style={styles.link}>Quay về trang chính</Link>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        textAlign: 'center',
    },
    header: {
        fontSize: '2rem',
        marginBottom: '1rem',
    },
    link: {
        marginTop: '1rem',
        color: 'blue',
        textDecoration: 'underline',
    },
};

export default NoPage;
