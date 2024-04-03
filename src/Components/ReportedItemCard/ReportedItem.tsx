import React from "react";
import "./ReportedItem.css";
import {Link} from "react-router-dom";

export const ReportedItem : React.FC<{item: any}> = ({item})=>{
  return(
    <div className={"d-flex justify-content-start align-items-start"} style={{width:"35rem"}}>
      {/* Desktop Version */}
      <Link to={"/" + String(item.ListId)} className={"d-none d-sm-flex text-decoration-none hw-reported-item justify-content-center " +
        "shadow p-0 align-items-center"}>
        <div className={"row w-100"}>
          <div className={"col-4 p-0"}>
            <img src={item.Image} className={"hw-reported-img  img-fluid h-100 p-0 m-0"}></img>
          </div>
          <div className={"col-7"}>
            <h1 className={"m-0 p-0"}>{item.Make} {item.Model}</h1>
            <hr className={"m-1 p-0"}></hr>
            <div className={"hw-reported-details pb-2 pt-2"}>
              <Link to={"/user?id=" + item.SellerId} className={" text-decoration-none"}>
                <b className={"hw-reported-title"}>Listed by: </b>
                {item.Seller}
              </Link>
              <p className={""}>
                <b className={"hw-reported-title"}>Report Reason: </b>
                {item.Description}
              </p>
              <Link to={"/user?id=" + item.ReporterId} className={" text-decoration-none"}>
                <b className={"hw-reported-title"}>Reported by: </b>
                {item.Reporter}
              </Link>
            </div>
          </div>
        </div>
      </Link>

      {/*Mobile Version */}
      <Link to={"/" + String(item.ListId)} className={"d-sm-none d-flex text-decoration-none hw-reported-item  justify-content-center " +
        "shadow p-0 flex-column"}>
          <div className={"d-flex justify-content-center"}>
            <img src={item.Image} className={"hw-reported-img"}></img>
          </div>
          <div className={"p-25"}>
            <h1 className={"m-0 p-0 ps-1"}>{item.Make} {item.Model}</h1>
            <hr className={"m-1 p-0"}></hr>
            <div className={"hw-reported-details ps-2 pb-2"}>
              <Link to={"/user?id=" + item.SellerId} className={" text-decoration-none"}>
                <b className={"hw-reported-title"}>Listed by: </b>
                {item.Seller}
              </Link>
              <p className={""}>
                <b className={"hw-reported-title"}>Report Reason: </b>
                {item.Description}
              </p>
              <Link to={"/user?id=" + item.ReporterId} className={" text-decoration-none"}>
                <b className={"hw-reported-title"}>Reported by: </b>
                {item.Reporter}
              </Link>
            </div>
          </div>
      </Link>
    </div>

  )
}