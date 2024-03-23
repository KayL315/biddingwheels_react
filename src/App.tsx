import React from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter, HashRouter, Link, Route, Routes} from "react-router-dom";
import {AdminReports} from "./AdminReportsPage/AdminReports";
import {AdminWebsiteStats} from "./AdminWebsiteStatsPage/AdminWebsiteStats";

function App() {

  return (
    <BrowserRouter>
      <div className="d-flex flex-column">
        <h1>BiddingWheels Home Page</h1>
        <Link to={"/adminreports"}> Admin Reports </Link>
        <Link to={"/admin-website-stats"}> Admin Website Statistics Page</Link>
      </div>
      <div>
        <Routes>
            <Route path={"/adminreports"} element={<AdminReports/>}/>
            <Route path={"/admin-website-stats"} element={<AdminWebsiteStats/>}/>
        </Routes>
      </div>

    </BrowserRouter>

  );
}

export default App;
