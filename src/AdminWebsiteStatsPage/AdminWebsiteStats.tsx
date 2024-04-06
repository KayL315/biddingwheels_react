import React, {useEffect, useRef, useState} from "react";
import "./AdminWebsiteStats.css";
import type {ChartData, ChartOptions} from "chart.js";
import {Chart} from "react-chartjs-2";
import {LineChart} from "../Utils/Chart/LineChart";
import {LoadingSpinner} from "../Utils/LoadingSpinner/LoadingSpinner";
import {ErrorAlert} from "../Utils/ErrorAlert/ErrorAlert";
import axios, {AxiosResponse} from "axios";
import {useNavigate} from "react-router-dom";

export const AdminWebsiteStats: React.FC<{}> = () => {
  const navigator = useNavigate();

  const handleAdmin= ()=>{
    let storedUserData : any = localStorage.getItem('userData');
    storedUserData = JSON.parse(storedUserData)
    if(!storedUserData || storedUserData.user_role !== "admin"){
      alert("Only admin allowed")
      navigator('/')
    }
  }


  const[dailySalesData, setDailySalesData] = useState<any[]>([]);
  const [modelSales, setModelSales] = useState<any[]>([]);
  const [todaySold, setTodaySold] = useState<number>(0);

  // Error to be displayed (if any)
  const [error, setError] = useState<string>("");
  // If data still loading
  const [loading, setLoading] = useState<boolean>(true);

  function getTodayDate(): string {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

// Example usage
  const todayDate = getTodayDate();
  // console.log(todayDate); //

  useEffect(()=>{
    handleAdmin()
    const handleStatsFetch= async ()=>{
      try{

        const SERVER_URL : string | undefined = process.env.REACT_APP_SERVER_URL;
        if(!SERVER_URL){
          setError("SERVER_URL not retrieved correctly!");
        }
        const URL: string = SERVER_URL + "/website-stats";
        const response : AxiosResponse = await axios.get(URL)
        if(response){
          setModelSales(response.data["model_sales"])
          setDailySalesData(response.data["sales"])

          for(const data of dailySalesData){
            if(data.Date === todayDate){
              setTodaySold(data.Total.Sales)
            }
          }
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
        <div className={"mt-2 "}>
          <p className={"row d-flex align-items-center justify-contents-center"}>
            <b className={"col-7"}>Cars Sold: </b>
            {/* The latest sale number */}
            <span className={"col-5"}>{todaySold}</span>
          </p>
        </div>

      </div>

      <div className={"d-flex justify-content-center align-items-center flex-column mt-5"}>
        <h2 className={""}>Recent Website Trend</h2>
        <LineChart data={dailySalesData}/>
      </div>

      <div className={"d-flex"}>
        <div className={"d-flex justify-content-center align-items-top m-5 w-50"}>
          <table className={"table table-striped"}>
            <thead>
            <tr>
              <th scope={"col"}>Date</th>
              <th scope={"col"}>Total Sales</th>
            </tr>

            </thead>
            <tbody>
            {dailySalesData.map((data : any, index : number)=>(
              <tr key={index} >
                <td scope={"row"}>{data.Date}</td>
                <td scope={"row"}>{data.Total_Sales}</td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>

        <div className={"d-flex justify-content-center align-items-top m-5 w-50"}>
          <table className={"table table-striped"}>
            <thead>
            <tr>
              <th scope={"col"}>Best Selling Car Models</th>
              <th scope={"col"}>Cars Sold</th>
            </tr>
            </thead>
            <tbody>
            {modelSales.map((data)=>(
              <tr>
                <td scope={"row"}>{data.Model}</td>
                <td scope={"row"}>{data.Sold}</td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};
