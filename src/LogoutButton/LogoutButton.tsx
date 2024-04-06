import React from 'react';
import axios from 'axios';

export const handleLogout = async () => {
    try {
        const response = await axios.get('http://localhost:8000/logout', { withCredentials: true });
        console.log(response.data.message);
        // 清除本地存储的用户数据
        localStorage.removeItem('userData');
        // 可以做其他的一些操作，例如导航到登录页面等
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
