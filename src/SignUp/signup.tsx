import React, { useState } from 'react';
import axios, { AxiosError, AxiosResponse } from 'axios'; // 引入 AxiosError 类型
import { Link } from 'react-router-dom';

const SignUp: React.FC = () => {
  const [formData, setFormData] = useState<{ username: string; password: string }>({ username: '', password: '' });
  const [error, setError] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form data:', formData);

    try {
      const response: AxiosResponse = await axios.post('http://localhost:8000/signup', formData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      window.location.href = '/login';
    } catch (error: any) { // 将 error 声明为 any 类型，以便可以直接访问 response 属性
      console.error('Failed to sign up:', error);
      if ((error.response && error.response.data && error.response.data.error === 'Username already exists')) {
        setError('Username already exists');
      } else {
        setError('Failed to sign up');
      }
    }
  };

//   return (
//     <div>
//       <h2>Sign Up</h2>
//       <form onSubmit={handleSignUp}>
//         <div>
//           <label htmlFor="username">Username:</label>
//           <input type="text" id="username" name="username" value={formData.username} onChange={handleInputChange} />
//         </div>
//         <div>
//           <label htmlFor="password">Password:</label>
//           <input type="password" id="password" name="password" value={formData.password} onChange={handleInputChange} />
//         </div>
//         <button type="submit">Sign Up</button>
//         {error && <p style={{ color: 'red' }}>{error}</p>}
//       </form>
//       <p>Already have an account? <Link to="/login">Log in here</Link></p>
//     </div>
//   );

return (
  <div style={{ margin: "5% auto", maxWidth: "400px", width: "100%" }}>
    <h2>Sign Up</h2>
    <form onSubmit={handleSignUp} style={{ display: "flex", flexDirection: "column", padding: "1rem" }}>
      <div style={{ marginBottom: "1rem" }}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
          style={{ width: "100%" }}
        />
      </div>
      <div style={{ marginBottom: "1rem" }}>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleInputChange}
          style={{ width: "100%" }}
        />
      </div>
      <button type="submit" className="btn btn-dark mb-4" style={{ width: "100%" }}>Sign Up</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
    <p>Already have an account? <Link to="/login">Log in here</Link></p>
  </div>
);


};
  

export default SignUp;



