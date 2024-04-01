import "./IconLink.css";
import { ReactNode, memo } from "react";
import { Link } from "react-router-dom";

export interface IconLinkProps {
    icon: ReactNode;
    text: string;
    url: string;
}

export const IconLink = memo((props: IconLinkProps) => {
    const { icon, text, url } = props;
    return (
        <div className="iconlink-contaner">
            <Link to={url}>
                <div className="iconlink-content">
                    <div className="iconlink-icon">{icon}</div>
                    <div className="iconlink-text">{text}</div>
                </div>
            </Link>
        </div>
    );
});
