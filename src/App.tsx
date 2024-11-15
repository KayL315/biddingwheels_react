import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import { AdminReports } from "./AdminReportsPage/AdminReports";
import { AdminWebsiteStats } from "./AdminWebsiteStatsPage/AdminWebsiteStats";
import { CarsDetailsPage } from "./CarsDetailsPage/CarsDetailsPage";
import { PostListing } from "./PostListing/PostListing";
import LogIn from "./LoginPage/LoginPage";
import UserProfile from "./UserProfile/UserProfile";
import { HomePage } from "./pages";
import SignUp from "./SignUp/signup";
import { NavBar } from "./Components/NavBar/NavBar";
import LogoutButton from "./LogoutButton/LogoutButton";
import OtherProfile from "./OtherProfile/OtherProfile";
import Message from "./Message/Message";
function App() {
    return (
        <div>
            <NavBar />
            <div>
                <Routes>
                    <Route path={"/adminreports"} element={<AdminReports />} />
                    <Route
                        path={"/admin-website-stats"}
                        element={<AdminWebsiteStats />}
                    />
                    <Route path={"/postlisting"} element={<PostListing />} />
                    <Route
                        path={"/list/:listid"}
                        element={<CarsDetailsPage />}
                    />
                    <Route path={"/login"} element={<LogIn />} />
                    <Route path={"/userprofile"} element={<UserProfile />} />
                    <Route path={"/signup"} element={<SignUp />} />
                    <Route path={"/"} element={<HomePage />} />
                    <Route path={"/logout"} element={<LogoutButton />} />
                    <Route
                        path="/other_profile/:username"
                        element={<OtherProfile />}
                    />
                    <Route path="*" element={<Navigate to="/" replace />} />
                    <Route path={"/logout"} element={<LogoutButton />} />
                    <Route path="/other_profile/:username" element={<OtherProfile />} />
                    <Route path={"/message"} element={<Message />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;
