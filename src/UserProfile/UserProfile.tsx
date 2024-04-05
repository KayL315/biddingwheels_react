import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

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
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // useEffect(() => {
  //   checkSession();
  // }, []);

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
      setIsLoggedIn(true);
    } else {
      checkSession();
    }
  }, []);

  const checkSession = async () => {
    try {
      const response = await axios.get<any>('http://localhost:8000/check_session', { withCredentials: true });
      if (response.data.user_role) {
        // 用户已登录，设置用户数据并将isLoggedIn状态设置为true
        setIsLoggedIn(true);
        setUserData(response.data); // 可以根据需要设置用户数据
        localStorage.setItem('userData', JSON.stringify(response.data));
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
  



  const handleEdit = () => {
    setIsEditing(true);
    setEditedData({ ...userData });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedData({
      ...editedData,
      [e.target.name]: e.target.value
    });
  };

  const handleConfirm = async () => {
    try {
      await axios.put('http://localhost:8000/profile', editedData, { withCredentials: true });
      setIsEditing(false);
      checkSession();
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

  return (
    <div>
      {isEditing ? (
        <div>
          <h2>Edit Profile</h2>
          <form>
            <label>Username: </label>
            <input type="text" name="username" value={editedData.username} onChange={handleInputChange} /><br />
            <label>Password: </label>
            <input type="password" name="password" value={editedData.password} onChange={handleInputChange} /><br />
            <label>Avatar: </label>
            <input type="text" name="avatar" value={editedData.avatar} onChange={handleInputChange} /><br />
            <label>Address: </label>
            <input type="text" name="address" value={editedData.address} onChange={handleInputChange} /><br />
            <label>Payment Method: </label>
            <input type="text" name="payment_method" value={editedData.payment_method} onChange={handleInputChange} /><br />
          </form>
          <button onClick={handleConfirm}>Confirm</button>
        </div>
      ) : (
        <div>
          <h2>User Profile</h2>
          <p>Username: {userData.username}</p>
          <p>Password: {userData.password}</p>
          <p>Avatar: {userData.avatar}</p>
          <p>Address: {userData.address}</p>
          <p>Payment Method: {userData.payment_method}</p>
          <button onClick={handleEdit}>Edit</button>
        </div>
      )}
    </div>
  );
};

export default Profile;



