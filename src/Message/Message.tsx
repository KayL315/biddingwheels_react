// Message.tsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MessageCard from './MessageCard';

interface Message {
    id: number;
    description: string;
    sender_username: string; // 修改为发送者用户名
}

const MessagePage: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await axios.get<{ messages: Message[] }>('http://localhost:8000/get_messages', { withCredentials: true });
                setMessages(response.data.messages);
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        };

        fetchMessages();
    }, []);

    return (
        <div>
            <h1>Messages</h1>
            <div className="message-list">
                {messages.map((message) => (
                    <MessageCard key={message.id} message={message} />
                ))}
            </div>
        </div>
    );
};

export default MessagePage;
