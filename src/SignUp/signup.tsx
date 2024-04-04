// import React, { useState, ChangeEvent } from "react";
// import { Link } from "react-router-dom";
// import { MDBBtn, MDBContainer, MDBCard, MDBCardBody, MDBRow, MDBCol, MDBInput } from "mdb-react-ui-kit";
// import * as client from "/Users/kaysmacpro/biddingwheels_react/src/Utils/Clients/userclient";

// interface Credentials {
//   username: string;
//   password: string;
//   // role: "ADMIN" | "NORMAL";
// }

// const SignUp: React.FC = () => {
//   const [error, setError] = useState<string>("");
//   const [credentials, setCredentials] = useState<Credentials>({
//     username: "",
//     password: "",
//     // role: "NORMAL", // Initial role
//   });

//   const [isValidPassword, setIsValidPassword] = useState<boolean>(true);


//   // 这里！！！！
//   const signup = async () => {
//     try {
//       await client.signup(credentials);
//       // Signup successful, redirect to home page
//       window.location.href = "/login"; //注册成功就导航去登录界面
//     } catch (err: any) { // 声明 err 的类型为 any 不然后面的err会被标红
//       if (err.response && err.response.data && err.response.data.message) {
//         setError(err.response.data.message);
//       } else {
//         setError("Failed to signup"); // Set a default error message
//       }
//     }
//   };
  

//   return (
//     <MDBContainer className="my-5">
//       <MDBCard className="w-50 mx-auto">
//         <MDBRow className="g-0">
//           <MDBCol md="12">
//             <MDBCardBody className="d-flex flex-column">
//               <button
//                 type="button"
//                 className="btn-close"
//                 aria-label="Close"
//                 style={{ alignSelf: "flex-end" }}
//               ></button>
//               <div className="d-flex flex-row mt-2">
//                 <span className="h1 fw-bold mb-0">Sign Up</span>
//               </div>
//               <br />

//               {/* create a new user */}
//               <MDBInput
//                 wrapperClass="mb-4"
//                 label="Username"
//                 id="Username"
//                 type="text"
//                 size="md"
//                 placeholder="User123456"
//                 onChange={(e) =>
//                   setCredentials({
//                     ...credentials,
//                     username: e.target.value,
//                   })
//                 }
//               />

//               <MDBInput
//                 wrapperClass="mb-4"
//                 label="Password"
//                 id="password"
//                 type="password"
//                 size="md"
//                 placeholder="Must have 6 characters"
//                 onChange={(e) => {
//                   setCredentials((prevCredentials) => ({
//                     ...prevCredentials,
//                     password: e.target.value,
//                   }));

//                   setIsValidPassword(e.target.value.length >= 6);
//                 }}
//               />
//               {!isValidPassword && (
//                 <p style={{ color: "red" }}>Less than 6 characters.</p>
//               )}
//               <br />
//               <p>
//                 By continuing, you agree to our User Agreement and acknowledge
//                 that you understand the Privacy Policy.
//               </p>

//               {/* By clicking it, add the new user to the db. */}
//               <button
//                 type="button"
//                 className="btn btn-dark btn-lg mb-4 px-5 btn-lg"
//                 onClick={signup}
//               >
//                 Create account
//               </button>

//               <p
//                 className="mb-5 pb-lg-2 text-center"
//                 style={{ color: "#393f81" }}
//               >
//                 Already have an account?&nbsp;
//                 <Link
//                   to="/LogIn"
//                   className={window.location.pathname === "/LogIn" ? "active" : ""}
//                   style={{ color: "#393f81" }}
//                 >
//                   Log in here
//                 </Link>
//               </p>
//             </MDBCardBody>
//           </MDBCol>
//         </MDBRow>
//       </MDBCard>
//     </MDBContainer>
//   );
// }

// export default SignUp;
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

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSignUp}>
        <div>
          <label htmlFor="username">Username:</label>
          <input type="text" id="username" name="username" value={formData.username} onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" value={formData.password} onChange={handleInputChange} />
        </div>
        <button type="submit">Sign Up</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
      <p>Already have an account? <Link to="/login">Log in here</Link></p>
    </div>
  );
};

export default SignUp;



