import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MDBInput } from "mdb-react-ui-kit"; 
// import { useSelector, useDispatch } from "react-redux";
// import { setUser } from "../../Reducers/userReducer";
import { useNavigate } from "react-router-dom";
// import * as client from "../../Clients/userclient.js";
import "./LoginPage.css";
import "mdb-ui-kit/css/mdb.min.css";

interface Credentials {
  username: string;
  password: string;
}

function LogIn() {
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");
  const [credentials, setCredentials] = useState<Credentials>({
    username: "",
    password: "",
  });

  // const user = useSelector((state: any) => state.userReducer);
  // const dispatch = useDispatch();

  const signin = async () => {
    // client要写一下
    // try {
    //   const response = await client.signin(credentials);
    //   dispatch(setUser(response)); // 假设服务器返回的数据结构与用户状态相匹配
    //   navigate("/home");
    // } catch (err) {
    //   setError("Incorrect username or password");
    //   window.alert("Please recheck your information and try again");
    // }
  };

  const [isValidPassword, setIsValidPassword] = useState<boolean>(true);

  return (
    <div className="vh-100" style={{ backgroundColor: "#eee" }}>
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black" style={{ borderRadius: "25px" }}>
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                      LOG IN
                    </p>

                    <form className="mx-1 mx-md-4">
                      <div className="d-flex flex-row align-items-center mb-2">
                        <div className="form-outline flex-fill mb-0">
                          <MDBInput
                            wrapperClass="mb-4"
                            label="Username"
                            id="username"
                            type="text"
                            size="lg"
                            onChange={(e) =>
                              setCredentials({
                                ...credentials,
                                username: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-2">
                        <div className="form-outline flex-fill mb-0">
                          <MDBInput
                            wrapperClass="mb-4"
                            label="Password"
                            id="password"
                            type="password"
                            size="lg"
                            onChange={(e) => {
                              setCredentials((prevCredentials) => ({
                                ...prevCredentials,
                                password: e.target.value,
                              }));

                              setIsValidPassword(e.target.value.length >= 6);
                            }}
                          />
                          {!isValidPassword && (
                            <p style={{ color: "red" }}>
                              The password must be at least 6 characters long
                            </p>
                          )}
                        </div>
                      </div>

                      <p className="ms-5">
                        Don't have an account?&nbsp;
                        <Link to="/SignUp" style={{ color: "#393f81" }}>
                          Register here
                        </Link>

                      </p>
                      <br />

                      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <button
                          type="button"
                          className="btn btn-dark btn-lg"
                          onClick={signin}
                        >
                          LOGIN
                        </button>
                      </div>
                    </form>
                  </div>
                  <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                    <img
                      src="https://img.freepik.com/free-vector/red-racing-car_1308-41588.jpg?w=1800&t=st=1711889167~exp=1711889767~hmac=db1cc20acd106117845a455ea91e6a0a54c08ed0bfa709770ecc5f10e9b6a411"
                      className="img-fluid"
                      alt="Sample image"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LogIn;
