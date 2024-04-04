import "./NavBar.css";
import { IconLink } from "./IconLink";
import { FaCircle, FaCar, FaRegUserCircle } from "react-icons/fa";
import { TbSteeringWheel } from "react-icons/tb";
import { IoMdAddCircleOutline } from "react-icons/io";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

export const NavBar = () => {
    const { isLogin, isAdmin } = useSelector((state: RootState) => state.user);
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
            {isLogin && (
                <IconLink
                    icon={<FaRegUserCircle />}
                    text="Profile"
                    url="/userprofile"
                />
            )}
            {!isLogin && (
                <IconLink
                    icon={<TbSteeringWheel />}
                    text="Login"
                    url="/login"
                />
            )}

            {/* <IconLink icon={<TbSteeringWheel />} text="Signup" url="/signup" /> */}
            {/* <IconLink icon={<FaCircle />} text="Payment" url="/payment" /> */}
        </div>
    );
};
