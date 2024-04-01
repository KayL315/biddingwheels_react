import "./NavBar.css";
import { IconLink } from "./IconLink";
import { FaCircle } from "react-icons/fa";

export const NavBar = () => {
    return (
        <div className="navbar-container">
            <IconLink
                icon={<FaCircle />}
                text="Home"
                url="/"
            />
            <IconLink
                icon={<FaCircle />}
                text="Admin Reports"
                url="/adminreports"
            />
            <IconLink
                icon={<FaCircle />}
                text="Statistics"
                url="/admin-website-stats"
            />
            <IconLink icon={<FaCircle />} text="New Post" url="/postlisting" />
            <IconLink icon={<FaCircle />} text="Login" url="/login" />
            <IconLink icon={<FaCircle />} text="Signup" url="/signup" />
            <IconLink icon={<FaCircle />} text="Profile" url="/userprofile" />
        </div>
    );
};
