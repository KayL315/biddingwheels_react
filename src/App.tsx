import React from 'react';
import './App.css';
import {BrowserRouter, Link, Route, Routes} from "react-router-dom";
import {AdminReports} from "./AdminReportsPage/AdminReports";
import {AdminWebsiteStats} from "./AdminWebsiteStatsPage/AdminWebsiteStats";
import {CarsDetailsPage} from "./CarsDetailsPage/CarsDetailsPage";

function App() {

  return (
    <div>
      <div className="d-flex flex-column">
        <h1>BiddingWheels Home Page | Headbar Section</h1>
        <Link to={"/adminreports"}> Admin Reports </Link>
        <Link to={"/admin-website-stats"}> Admin Website Statistics Page</Link>
      </div>
      <div className={""}>
        <Routes>
          <Route path={"/adminreports"} element={<AdminReports/>}/>
          <Route path={"/admin-website-stats"} element={<AdminWebsiteStats/>}/>
          <Route path={"/:listid"} element={<CarsDetailsPage/>}/>
        </Routes>
      </div>
    </div>

  );
}

export default App;
