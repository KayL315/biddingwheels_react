import React from "react";
import "./ReportedItem.css"
import {Link} from "react-router-dom";

export const ReportedItem : React.FC<{item: any}> = ({item})=>{


  return(
    // Link to /adminreports/item-listing page
    <Link to={"/" + String(item.listid)} className={"text-decoration-none container hw-reported-item d-flex justify-content-center " +
      "shadow p-0"}>
        <div className={"row w-100"}>
          <div className={"col-4 p-0 w-0  d-flex align-items-start"}>
            <img src={item.image} className={"hw-reported-img  w-100 p-0 m-0"}></img>
          </div>
          <div className={"col-7"}>
            <h1 className={"m-0 p-0"}>{item.make} {item.model}</h1>
            <hr className={"m-1 p-0"}></hr>
            <div className={"hw-reported-details"}>
              <Link to={"/sellerId"} className={" text-decoration-none"}>
                <b className={"hw-reported-title"}>Listed by: </b>
                {item.seller}
              </Link>
              <p className={""}>
                <b className={"hw-reported-title"}>Report Reason: </b>
                {item.reason_for_report}
              </p>
              <Link to={"/reporterId"} className={" text-decoration-none"}>
                <b className={"hw-reported-title"}>Reported by: </b>
                {item.reporter}
              </Link>
            </div>
          </div>
        </div>

    </Link>

  )
}