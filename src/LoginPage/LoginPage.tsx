import React, { useState } from "react";
import axios from "axios";
import { AxiosError } from "axios";
import { Link } from "react-router-dom";
import "./LoginPage.css";
import { useDispatch } from "react-redux";
import { login as LoginFunc } from "../Slice";
import { useNavigate } from "react-router-dom";

// import "mdb-ui-kit/css/mdb.min.css";
const LogIn: React.FC = () => {
    const [credentials, setCredentials] = useState<{
        username: string;
        password: string;
    }>({ username: "", password: "" });
    const [error, setError] = useState<string>("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value,
        });
    };

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                "http://localhost:8000/login",
                credentials,
                {
                    withCredentials: true,
                }
            );

            // 登录成功后的处理
            console.log("Login successful:", response.data);
            dispatch(LoginFunc(response.data));
            navigate("/");
            // window.location.href = '/'; // 导航回到首页
        } catch (error: any) {
            // 处理登录失败
            if ((error as AxiosError).response?.status === 404) {
                setError("User does not exist");
            } else if ((error as AxiosError).response?.status === 401) {
                setError("Incorrect password");
            } else {
                const responseData: { error?: string } =
                    (error as AxiosError).response?.data || {};
                const errorMessage = responseData.error || "Unknown error";
                setError(errorMessage);
            }
            console.error(
                "Failed to log in:",
                (error as AxiosError).message || "Unknown error"
            );
        }
    };

    // return (
    //   <div className="login-container">
    //     <h2>Login</h2>
    //     <form onSubmit={handleLogin}>
    //       <div>
    //         <label htmlFor="username">Username:</label>
    //         <input type="text" id="username" name="username" value={credentials.username} onChange={handleInputChange} />
    //       </div>
    //       <div>
    //         <label htmlFor="password">Password:</label>
    //         <input type="password" id="password" name="password" value={credentials.password} onChange={handleInputChange} />
    //       </div>
    //       <button type="submit">Login</button>
    //       {error && <p className="error">{error}</p>}
    //     </form>
    //     <p>Don't have an account? <Link to="/signup">Sign up here</Link></p>
    //   </div>
    // );

    return (
        <div className="vh-100" style={{ backgroundColor: "#eee" }}>
            <div className="container h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-lg-12 col-xl-11">
                        <div
                            className="card text-black"
                            style={{ borderRadius: "25px" }}
                        >
                            <div className="card-body p-md-5">
                                <div className="row justify-content-center">
                                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                                        <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                                            LOG IN
                                        </p>

                                        <form
                                            className="mx-1 mx-md-4"
                                            onSubmit={handleLogin}
                                        >
                                            <div className="d-flex flex-row align-items-center mb-2">
                                                <div className="form-outline flex-fill mb-0">
                                                    <input
                                                        className="form-control mb-4"
                                                        placeholder="Username"
                                                        id="username"
                                                        type="text"
                                                        size={3} // Change size value to a number
                                                        value={
                                                            credentials.username
                                                        }
                                                        onChange={(e) =>
                                                            setCredentials({
                                                                ...credentials,
                                                                username:
                                                                    e.target
                                                                        .value,
                                                            })
                                                        } // Connect onChange to handleInputChange
                                                    />
                                                </div>
                                            </div>

                                            <div className="d-flex flex-row align-items-center mb-2">
                                                <div className="form-outline flex-fill mb-0">
                                                    <input
                                                        className="form-control mb-4"
                                                        placeholder="Password"
                                                        id="password"
                                                        type="password"
                                                        size={3} // Change size value to a number
                                                        value={
                                                            credentials.password
                                                        }
                                                        onChange={(e) =>
                                                            setCredentials({
                                                                ...credentials,
                                                                password:
                                                                    e.target
                                                                        .value,
                                                            })
                                                        } // Connect onChange to handleInputChange
                                                    />
                                                    {error && (
                                                        <p
                                                            style={{
                                                                color: "red",
                                                            }}
                                                        >
                                                            Cannot Login 
                                                        </p>
                                                    )}
                                                </div>
                                            </div>

                                            <p className="ms-5">
                                                Don't have an account?&nbsp;
                                                <Link
                                                    to="/SignUp"
                                                    style={{ color: "#393f81" }}
                                                >
                                                    Register here
                                                </Link>
                                            </p>
                                            <br />

                                            <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                <button
                                                    type="submit"
                                                    className="btn btn-dark btn-lg"
                                                >
                                                    LOGIN
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LogIn;
