import "./IconLink.css";
import { ReactNode, memo } from "react";
import { Link } from "react-router-dom";

export interface IconLinkProps {
    icon: ReactNode;
    text: string;
    url: string;
    hoverEffect?: boolean;
}

export const IconLink = memo((props: IconLinkProps) => {
    const { icon, text, url, hoverEffect = true } = props;
    return (
        <div className={`${hoverEffect ? "icon-link-hover" : ""} iconlink-contaner`}>
            <Link to={url}>
                <div className="iconlink-content">
                    <div className="iconlink-icon">{icon}</div>
                    <div className="iconlink-text">{text}</div>
                </div>
            </Link>
        </div>
    );
});
