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

export const NavBar = memo(() => {
    const { isLogin, isAdmin } = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch();
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
            {isAdmin && (
                <IconLink
                    icon={<FaCircle />}
                    text="Admin Reports"
                    url="/adminreports"
                />
            )}
            {isAdmin && (
                <IconLink
                    icon={<FaCircle />}
                    text="Statistics"
                    url="/admin-website-stats"
                />
            )}
            <div className="user-status-container">
                {!isLogin && (
                    <IconLink
                        icon={<TbSteeringWheel />}
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
                            });
                        }}
                        label="Logout"
                    />
                )}
            </div>
        </div>
    );
});
