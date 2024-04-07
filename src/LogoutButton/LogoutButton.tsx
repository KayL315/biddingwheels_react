import React from 'react';
import axios from 'axios';

export const handleLogout = async () => {
    try {
        const response = await axios.get('http://localhost:8000/logout', { withCredentials: true });
        console.log(response.data.message);
        // 清除本地存储的用户数据
        localStorage.removeItem('userData');
        window.location.href = '/';
    } catch (error) {
        console.error('Failed to log out:', error);
    }
};

const LogoutButton: React.FC = () => {
    return (
        <button onClick={handleLogout}>Logout</button>
    );
};

export default LogoutButton;
