import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './UserProfile.css';

interface UserData {
  username: string;
  password: string;
  avatar: string;
  address: string;
  payment_method: string;
}

const Profile: React.FC = () => {
  const [userData, setUserData] = useState<UserData>({ username: '', password: '', avatar: '', address: '', payment_method: '' });
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedData, setEditedData] = useState<UserData>({ username: '', password: '', avatar: '', address: '', payment_method: '' });
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  //展示Listing
  const [listings, setListings] = useState<any[]>([]);



  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await axios.get<any>('http://localhost:8000/check_session', { withCredentials: true });
        console.log('Data from server:', response.data); 
        if (response.data.user_id) {
          // 用户已登录，设置用户数据并将isLoggedIn状态设置为true
          setUserData(response.data); // 设置用户数据
          setIsLoggedIn(true);
          localStorage.setItem('userData', JSON.stringify(response.data));
          // 调用获取列表数据的函数
          await fetchListings();
        } else {
          // 用户未登录，将isLoggedIn状态设置为false
          setIsLoggedIn(false);
        }
      } catch (error) {
        // 请求失败，将isLoggedIn状态设置为false
        setIsLoggedIn(false);
      } finally {
        // 请求完成，将isLoading状态设置为false
        setIsLoading(false);
      }
    };
  
    // 定义获取列表数据的函数
    const fetchListings = async () => {
      try {
        const response = await axios.get<any>('http://localhost:8000/user_listings', { withCredentials: true });
        console.log('Response from backend:', response.data);
        setListings(response.data.listings);
      } catch (error) {
        console.error('Failed to fetch user listings:', error);
      }
    };
  
    checkSession(); // 调用检查用户会话的函数
  
  }, []);
  


  const handleEdit = () => {
    setIsEditing(true);
    setEditedData({ ...userData });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedData({
      ...editedData,
      [e.target.name]: e.target.value
    });
  }
  const handlePaymentMethodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEditedData({
      ...editedData,
      payment_method: e.target.value
    });
  }

  const handleConfirm = async () => {
    try {
      await axios.put('http://localhost:8000/profile', editedData, { withCredentials: true });
      setIsEditing(false);
      // checkSession();
   
      window.location.href = '/userprofile';
    } catch (error) {
      console.error('Failed to update user information:', error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isLoggedIn) {
    return (
      <div>
        <p>You need to log in to edit the profile!</p>
        <Link to="/login">Log in here.</Link>
      </div>
    );
  }

  // return (
  //   <div>
  //     {isEditing ? (
  //       <div>
  //         <h2>Edit Profile</h2>
  //         <form>
  //           <label>Username: </label>
  //           <input type="text" name="username" value={editedData.username} onChange={handleInputChange} /><br />
  //           <label>Password: </label>
  //           <input type="password" name="password" value={editedData.password} onChange={handleInputChange} /><br />
  //           {/* <label>Avatar: </label>
  //           <input type="text" name="avatar" value={editedData.avatar} onChange={handleInputChange} /><br /> */}
  //           <label>Address: </label>
  //           <input type="text" name="address" value={editedData.address} onChange={handleInputChange} /><br />
  //           <label>Payment Method: </label>
  //           <select name="payment_method" value={editedData.payment_method} onChange={handlePaymentMethodChange}>
  //             <option value="online">Online</option>
  //             <option value="offline">Offline</option>
  //           </select><br />
  //         </form>
  //         <button onClick={handleConfirm}>Confirm</button>
  //       </div>
  //     ) : (
  //       <div>
  //         <h2>User Profile</h2>
  //         <p>Username: {userData.username}</p>
  //         {/* <p>Avatar: {userData.avatar}</p> */}
  //         <p>Address: {userData.address}</p>
  //         <p>Payment Method: {userData.payment_method}</p>
  //         <button onClick={handleEdit}>Edit</button>

  //         <div>
  //   <h3>Listings</h3>
  //   <div className="card-container">
  //     {listings.map((listing) => (
  //       <div key={listing.listid} className="card">
  //         <img src={listing.image} alt="Car" />
  //         <div>
  //           <h4>{listing.model}</h4>
  //           <p>Highest Bid: {listing.highest_bid}</p>
  //         </div>
  //       </div>
  //     ))}
  //   </div>
  // </div>


  //       </div>
  //     )}
  //   </div>
  // );

  return (
    <div className="user-profile-container">
      {isEditing ? (
        <div>
          <h2>Edit Profile</h2>
          <form>
            <label>Username: </label>
            <input type="text" name="username" value={editedData.username} onChange={handleInputChange} /><br />
            <label>Password: </label>
            <input type="password" name="password" value={editedData.password} onChange={handleInputChange} /><br />
            <label>Address: </label>
            <input type="text" name="address" value={editedData.address} onChange={handleInputChange} /><br />
            <label>Payment Method: </label>
            <select name="payment_method" value={editedData.payment_method} onChange={handlePaymentMethodChange}>
              <option value="online">Online</option>
              <option value="offline">Offline</option>
            </select><br />
          </form>
          <button onClick={handleConfirm}>Confirm</button>
        </div>
      ) : (
        <div>
          <h2>User Profile</h2>
          <div className="user-profile-info-box">
            <p>Username: {userData.username}</p>
            <p>Address: {userData.address}</p>
            <p>Payment Method: {userData.payment_method}</p>
          </div>
          <button onClick={handleEdit}>Edit</button>

          <div className="user-profile-listings-container">
            <h2>Listings</h2>
            <div className="user-profile-card-container">
              {listings.map((listing) => (
                <div key={listing.listid} className="user-profile-card">
                  <img src={listing.image} alt="Car" />
                  <div>
                    <h4>{listing.model}</h4>

                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;



