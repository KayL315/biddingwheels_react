import React from "react";
import "./App.css";
import { Link, Route, Routes } from "react-router-dom";
import { AdminReports } from "./AdminReportsPage/AdminReports";
import { AdminWebsiteStats } from "./AdminWebsiteStatsPage/AdminWebsiteStats";
import { CarsDetailsPage } from "./CarsDetailsPage/CarsDetailsPage";
import { PostListing } from "./PostListing/PostListing";
import LoginPage from "./LoginPage/LoginPage";
import UserProfile from "./UserProfile/UserProfile";
import { HomePage } from "./HomePage";
import SignUp from "./SignUp/signup";
import { NavBar } from "./Components/NavBar/NavBar";

// import { Provider } from 'react-redux';
// import store from './store';

function App() {
    return (
        <div>
            <NavBar />
            {/* <div className="d-flex flex-column">
                <h1>BiddingWheels Home Page | Headbar Section</h1>
                <Link to={"/adminreports"}> Admin Reports </Link>
                <Link to={"/admin-website-stats"}>
                    {" "}
                    Admin Website Statistics Page
                </Link>
                <Link to={"/postlisting"}> Post New Listing </Link>
                <Link to={"/login"}> Login Page</Link>
                <Link to={"/userprofile"}> User Profile</Link>
                <Link to={"/signup"}> Sign Up</Link>
            </div> */}
            <div>
                <Routes>
                    <Route path={"/adminreports"} element={<AdminReports />} />
                    <Route
                        path={"/admin-website-stats"}
                        element={<AdminWebsiteStats />}
                    />
                    <Route path={"/postlisting"} element={<PostListing />} />
                    <Route path={"/:listid"} element={<CarsDetailsPage />} />
                    <Route path={"/login"} element={<LoginPage />} />
                    <Route path={"/userprofile"} element={<UserProfile />} />
                    <Route path={"/"} element={<HomePage />} />
                    <Route path={"/signup"} element={<SignUp />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;
