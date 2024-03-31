import React, { useState, ChangeEvent } from "react";
import { Link } from "react-router-dom";
import { MDBBtn, MDBContainer, MDBCard, MDBCardBody, MDBRow, MDBCol, MDBInput } from "mdb-react-ui-kit";
import validator from "validator";
import "mdb-ui-kit/css/mdb.min.css";
// import * as client from "../../Clients/userclient.js";

interface Credentials {
  username: string;
  password: string;
  role: "ADMIN" | "USER" | "ENTERPRISE";
}

const SignUp: React.FC = () => {
  const [error, setError] = useState<string>("");
  const [credentials, setCredentials] = useState<Credentials>({
    username: "",
    password: "",
    role: "ADMIN", // Initial role
  });

  const handleRoleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedRole = event.target.value as "2" | "3" | "4";
    switch (selectedRole) {
      case "2":
        setCredentials({
          ...credentials,
          role: "ADMIN",
        });
        break;
      case "3":
        setCredentials({
          ...credentials,
          role: "USER",
        });
        break;
      case "4":
        setCredentials({
          ...credentials,
          role: "ENTERPRISE",
        });
        break;
      default:
        break;
    }
  };

  const [isValidPassword, setIsValidPassword] = useState<boolean>(true);

  const signup = async () => {
    // if (!isValidPassword) {
    //   window.alert("The password is not valid!");
    //   return;
    // }
    // try {
    //   await client.signup(credentials);
    //   window.alert("Signup successful!");
    // } catch (err) {
    //   setError(err.response.data.message);
    //   window.alert("The username has been registered, please use another one.");
    // }
  };

  return (
    <MDBContainer className="my-5">
      <MDBCard className="mx-auto ">
        <MDBRow className="g-0">
          <MDBCol md="12">
            <MDBCardBody className="d-flex flex-column">
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
                style={{ alignSelf: "flex-end" }}
              ></button>
              <div className="d-flex flex-row mt-2">
                <span className="h1 fw-bold mb-0">Sign Up</span>
              </div>
              <br />

              {/* create a new user */}
              <MDBInput
                wrapperClass="mb-4"
                label="Username"
                id="Username"
                type="text"
                size="md"
                placeholder="User123456"
                onChange={(e) =>
                  setCredentials({
                    ...credentials,
                    username: e.target.value,
                  })
                }
              />

              <MDBInput
                wrapperClass="mb-4"
                label="Password"
                id="password"
                type="password"
                size="md"
                placeholder="Must have 6 characters"
                onChange={(e) => {
                  setCredentials((prevCredentials) => ({
                    ...prevCredentials,
                    password: e.target.value,
                  }));

                  setIsValidPassword(e.target.value.length >= 6);
                }}
              />
              {!isValidPassword && (
                <p style={{ color: "red" }}>Less than 6 characters.</p>
              )}
              <br />
              <p>
                By continuing, you agree to our User Agreement and acknowledge
                that you understand the Privacy Policy.
              </p>

              {/* By clicking it, add the new user to the db. */}
              <button
  type="button"
  className="btn btn-dark btn-lg mb-4 px-5 btn-lg"
  onClick={signup}
>
  Create account
</button>

              <p
                className="mb-5 pb-lg-2 text-center"
                style={{ color: "#393f81" }}
              >
                Already have an account?&nbsp;
                <Link
  to="/LogIn"
  className={window.location.pathname === "/LogIn" ? "active" : ""}
  style={{ color: "#393f81" }}
>
  Log in here
</Link>

              </p>
            </MDBCardBody>
          </MDBCol>
        </MDBRow>
      </MDBCard>
    </MDBContainer>
  );
}

export default SignUp;
