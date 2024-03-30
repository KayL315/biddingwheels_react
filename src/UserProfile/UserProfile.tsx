import React, { useState } from 'react';
import './UserProfile.css'; 

const UserProfile: React.FC = () => {
  
  const [user, setUser] = useState({
    //从数据库读信息
    username: 'user123',
    email: 'user@example.com',
    password: '********',
    address: '123 Main St, City, Country',
    paymentMethod: 'Credit Card',
    auctionItems: [],
    participatedItems: [],
    publicAuctionItems: [],
    publicParticipatedItems: []
  });

  // 用户头像
  const avatarUrl = ''; 

  // 用户profile界面
  return (
    <div className="user-profile">
      <div className="user-info">
        <div className="avatar">
          <img src={avatarUrl} alt="User Avatar" />
        </div>
        <div className="details">
          <div className="field">
            <label>Username:</label>
            <span>{user.username}</span>
          </div>
          <div className="field">
            <label>Email:</label>
            <span>{user.email}</span>
          </div>
          <div className="field">
            <label>Password:</label>
            <span>{user.password}</span>
          </div>
          <div className="field">
            <label>Address:</label>
            <span>{user.address}</span>
          </div>
          <div className="field">
            <label>Payment Method:</label>
            <span>{user.paymentMethod}</span>
          </div>
        </div>
      </div>
      <div className="auction-items">
        {/* 数据库信息+根据需要渲染用户发布的竞拍商品 */}
      </div>
      <div className="participated-items">
        {/* 数据库信息+根据需要渲染用户参与的竞拍商品 */}
      </div>
    </div>
  );
};

export default UserProfile;
