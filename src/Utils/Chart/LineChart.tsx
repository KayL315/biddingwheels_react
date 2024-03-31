import React from "react";
import {Bar, Line} from "react-chartjs-2";
import "chart.js/auto";
import "./LineChart.css"
import { ChartOptions} from "chart.js";

export const LineChart : React.FC<{dates : any, sales : any}> = (props)=>{
  const dates = props.dates;
  const sales = props.sales;

  const data  = {
    labels:dates,
    datasets:[
      {
        label:"Daily Sales Number",
        data: sales,
        backgroundColor:["#179ED5"],
        borderColor:"#179ED5",
        borderWidth:1,
      },
    ],
  };

  const lineOptions : ChartOptions = {
    responsive: true,
    maintainAspectRatio: true,
  }

  return(
    <div className={"hw-linechart"}>
      <Line data={data} redraw={true} options={lineOptions}/>
    </div>
  )
}