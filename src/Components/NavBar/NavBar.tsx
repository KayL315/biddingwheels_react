import "./NavBar.css";
import { IconLink } from "./IconLink";
import { FaCircle, FaCar, FaRegUserCircle } from "react-icons/fa";
import { TbSteeringWheel } from "react-icons/tb";
import { IoMdAddCircleOutline } from "react-icons/io";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { memo } from "react";
import { IconButton } from "../IconButton";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { handleLogout } from "../../LogoutButton/LogoutButton";
import { useDispatch } from "react-redux";
import { logout } from "../../Slice";
import { useNavigate } from "react-router";
import { IoMailUnreadOutline } from "react-icons/io5";
import { LuFileText } from "react-icons/lu";
import { BsFileEarmarkBarGraph } from "react-icons/bs";
import { GoKey } from "react-icons/go";

export const NavBar = memo(() => {
    const { isLogin, isAdmin } = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    return (
        <div className="navbar-container">
            <IconLink icon={<FaCar />} text="Home" url="/" />
            {isLogin && (
                <IconLink
                    icon={<IoMdAddCircleOutline />}
                    text="New Post"
                    url="/postlisting"
                />
            )}
            {isLogin && (
                <IconLink
                    icon={<IoMailUnreadOutline />}
                    text="Message"
                    url="/message"
                />
            )}
            {isAdmin && (
                <IconLink
                    icon={<LuFileText />}
                    text="Admin Reports"
                    url="/adminreports"
                />
            )}
            {isAdmin && (
                <IconLink
                    icon={<BsFileEarmarkBarGraph />}
                    text="Statistics"
                    url="/admin-website-stats"
                />
            )}

            <div className="user-status-container">
                {!isLogin && (
                    <IconLink
                        icon={<GoKey />}
                        text="Login"
                        url="/login"
                    />
                )}
                {!isLogin && (
                    <IconLink
                        icon={<FaRegUserCircle />}
                        text="SignUp"
                        url="/signup"
                    />
                )}

                {isLogin && (
                    <IconLink
                        icon={<FaRegUserCircle />}
                        text="Profile"
                        url="/userprofile"
                    />
                )}

                {isLogin && (
                    <IconButton
                        icon={<RiLogoutCircleRLine />}
                        onClick={() => {
                            handleLogout().then(() => {
                                dispatch(logout());
                                navigate("/");
                            });
                        }}
                        label="Logout"
                    />
                )}
            </div>
        </div>
    );
});
