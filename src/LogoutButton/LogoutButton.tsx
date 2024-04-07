import React from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { logout as LogOutFunc } from "../Slice";
import { useNavigate } from "react-router";

export const handleLogout = async () => {
    try {
        const response = await axios.get("http://localhost:8000/logout", {
            withCredentials: true,
        });
        console.log(response.data.message);
        // 清除本地存储的用户数据
        localStorage.removeItem("userData");
        // 可以做其他的一些操作，例如导航到登录页面等
    } catch (error) {
        console.error("Failed to log out:", error);
    }
};

const LogoutButton: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    return (
        <button
            onClick={() => {
                handleLogout();
                dispatch(LogOutFunc());
                navigate("/login");
            }}
        >
            Logout
        </button>
    );
};

export default LogoutButton;
