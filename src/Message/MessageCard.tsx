// MessageCard.tsx
import { Link } from 'react-router-dom';
import React from 'react';
import './MessageCard.css';

interface MessageCardProps {
    message: {
        id: number;
        description: string;
        sender_username: string; // 发送者用户名
    };
}

const MessageCard: React.FC<MessageCardProps> = ({ message }) => {
    return (
        <div className="message-card">
            <Link to={`/other_profile/${message.sender_username}`} className="message-link">
            <h3>From Sender: {message.sender_username}</h3></Link>
            <p>Message Detail: {message.description}</p>
        </div>
    );
};

export default MessageCard;
