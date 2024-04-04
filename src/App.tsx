import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import { AdminReports } from "./AdminReportsPage/AdminReports";
import { AdminWebsiteStats } from "./AdminWebsiteStatsPage/AdminWebsiteStats";
import { CarsDetailsPage } from "./CarsDetailsPage/CarsDetailsPage";
import { PostListing } from "./PostListing/PostListing";
import LoginPage from "./LoginPage/LoginPage";
import UserProfile from "./UserProfile/UserProfile";
import { HomePage, ShipmentPage, PaymentPage } from "./pages";
import SignUp from "./SignUp/signup";
import { NavBar } from "./Components/NavBar/NavBar";

import { Provider } from "react-redux";
import store from "./store";

function App() {
    return (
        <Provider store={store}>
            <div>
                <NavBar />
                <div>
                    <Routes>
                        <Route
                            path={"/adminreports"}
                            element={<AdminReports />}
                        />
                        <Route
                            path={"/admin-website-stats"}
                            element={<AdminWebsiteStats />}
                        />
                        <Route
                            path={"/postlisting"}
                            element={<PostListing />}
                        />
                        <Route
                            path={"/list/:listid"}
                            element={<CarsDetailsPage />}
                        />
                        <Route path={"/login"} element={<LoginPage />} />
                        <Route
                            path={"/userprofile"}
                            element={<UserProfile />}
                        />
                        <Route path={"/signup"} element={<SignUp />} />
                        <Route path={"/payment"} element={<PaymentPage />} />
                        <Route path={"/shipment"} element={<ShipmentPage />} />
                        <Route path={"/"} element={<HomePage />} />
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                </div>
            </div>
        </Provider>
    );
}

export default App;
