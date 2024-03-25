import React, {useEffect, useRef} from "react";
import "./AdminWebsiteStats.css";
import type {ChartData, ChartOptions} from "chart.js";
import {Chart} from "react-chartjs-2";
import {LineChart} from "../Utils/Chart/LineChart";

export const AdminWebsiteStats: React.FC<{}> = () => {
  const data = {
    dates : ["Mar-01", "Mar-02", "Mar-03", "Mar-04", "Mar-05"],
    sales : [34, 60, 23, 55, 69]
  }



  return (
    <div className={""}>
      <h1>Daily Website Statistics</h1>
      <div className={"d-flex justify-content-center align-items-center flex-column"}>
        <h2>Today's Sales</h2>
        <div className={"mt-2"}>
          <p className={"row"}>
            <b className={"col-7"}>Cars Sold: </b>
            <span className={"col-5"}>{data.sales[data.sales.length - 1]}</span>
          </p>
          <p className={"row"}>
            <b className={"col-7"}>Best Selling Model: </b>
            <span className={"col-5"}>Toyota Prius</span>
          </p>
        </div>

      </div>

      <div className={"d-flex justify-content-center align-items-center flex-column mt-5"}>
        <h2 className={""}>Recent Website Trend</h2>
        <LineChart data={data}/>
      </div>

      <div className={"d-flex justify-content-center align-items-center m-5"}>
        <table className={"table table-striped"}>
          <thead>
            <tr>
              <th scope={"col"}>Date</th>
              <th scope={"col"}>Total Sales</th>
              <th scope={"col"}>Best Selling Models</th>
            </tr>

          </thead>
          <tbody>
          {data.dates.map((date, index)=>(
            <tr key={index} >
              <td scope={"row"}>{date}</td>
              <td scope={"row"}>{data.sales[index]}</td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
