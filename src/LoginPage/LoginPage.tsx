import React, { useState } from 'react';
import './LoginPage.css'; 
import { Link } from 'react-router-dom'; 
import { Navigate } from 'react-router-dom'; 

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const onButtonClick = () => {
    setEmailError("");
    setPasswordError("");

    if (email === "") {
      setEmailError("Please enter your email");
      return;
    }

    if (password === "") {
      setPasswordError("Please enter a password");
      return;
    }

    if (password.length < 8) {
      setPasswordError("Password must be 8 characters or longer");
      return;
    }

    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    // 假设登录逻辑验证通过后，跳转到首页
    // 这里处理账号密码跟数据库里的是否匹配，匹配上就跳转到首页，没有匹配上就提示错误
    return <Navigate to="/" />;
  };

  return (
    
    <div className="login-box">
      <h2>Login</h2>
      <form>
        <div className="user-box">
          <input
            value={email}
            placeholder='Enter email address here'
            onChange={ev => setEmail(ev.target.value)}
            className="user-box"
          />
          <label className='errorLabel'>{emailError}</label>
        </div>
        <div className="user-box">
          <input
            value={password}
            placeholder='Enter password here'
            onChange={ev => setPassword(ev.target.value)}
            className="user-box"
          />
          <label className='errorLabel'>{passwordError}</label>
        </div>
        <Link to="/" className="inputButton" onClick={onButtonClick}>
          Submit
        </Link>
      </form>
    </div>
  );
}

export default LoginPage;
