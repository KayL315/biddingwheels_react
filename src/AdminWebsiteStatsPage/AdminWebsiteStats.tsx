import React, {useEffect, useRef, useState} from "react";
import "./AdminWebsiteStats.css";
import type {ChartData, ChartOptions} from "chart.js";
import {Chart} from "react-chartjs-2";
import {LineChart} from "../Utils/Chart/LineChart";
import {LoadingSpinner} from "../Utils/LoadingSpinner/LoadingSpinner";
import {ErrorAlert} from "../Utils/ErrorAlert/ErrorAlert";

export const AdminWebsiteStats: React.FC<{}> = () => {
   const [dates, setDates] = useState<string[]>([]);
   const [sales, setSales] = useState<number[]>([]);

  // Error to be displayed (if any)
  const [error, setError] = useState<string>("");
  // If data still loading
  const [loading, setLoading] = useState<boolean>(true);



  useEffect(()=>{
    const handleStatsFetch= async ()=>{
      try{

        const SERVER_URL : string | undefined = process.env.REACT_APP_SERVER_URL;
        if(!SERVER_URL){
          setError("SERVER_URL not retrieved correctly!");
        }
        const URL: string = SERVER_URL + "/website-stats";
        const response : Response = await fetch(URL);
        const data = await response.json();
        if(data){
          setDates(data.dates);
          setSales(data.sales);
        }

        setError("")

      } catch(e : unknown){
        const msg : string = e instanceof Error? e.message : "Unknown Error Occurred";
        setError(msg)
      } finally {
        setLoading(false);
      }

    }

    handleStatsFetch();
  },[])



  return (
    loading? <LoadingSpinner/> :
    <div className={""}>
      {error? <ErrorAlert msg={error}/> : <></>}

      <h1>Daily Website Statistics</h1>
      <div className={"d-flex justify-content-center align-items-center flex-column"}>
        <h2>Today's Sales</h2>
        <div className={"mt-2"}>
          <p className={"row"}>
            <b className={"col-7"}>Cars Sold: </b>
            {/* The latest sale number */}
            <span className={"col-5"}>{sales[sales.length - 1]}</span>
          </p>
          <p className={"row"}>
            <b className={"col-7"}>Best Selling Model: </b>
            <span className={"col-5"}>Toyota Prius</span>
          </p>
        </div>

      </div>

      <div className={"d-flex justify-content-center align-items-center flex-column mt-5"}>
        <h2 className={""}>Recent Website Trend</h2>
        <LineChart dates={dates} sales={sales}/>
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
          {dates.map((date, index)=>(
            <tr key={index} >
              <td scope={"row"}>{date}</td>
              <td scope={"row"}>{sales[index]}</td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
