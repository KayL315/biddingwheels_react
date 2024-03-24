import React from "react";
import "./ReportedItem.css"
import {Link} from "react-router-dom";

export const ReportedItem : React.FC<{item: any}> = ({item})=>{


  return(
    <div className={"d-flex justify-content-start align-items-start"}>
      {/* Desktop Version */}
      <Link to={"/" + String(item.listid)} className={"d-none d-sm-flex text-decoration-none hw-reported-item justify-content-center " +
        "shadow p-0 align-items-center"}>
        <div className={"row w-100"}>
          <div className={"col-4 p-0"}>
            <img src={item.image} className={"hw-reported-img  img-fluid h-100 p-0 m-0"}></img>
          </div>
          <div className={"col-7"}>
            <h1 className={"m-0 p-0"}>{item.make} {item.model}</h1>
            <hr className={"m-1 p-0"}></hr>
            <div className={"hw-reported-details pb-2 pt-2"}>
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

      {/*Mobile Version */}
      <Link to={"/" + String(item.listid)} className={"d-sm-none d-flex text-decoration-none hw-reported-item  justify-content-center " +
        "shadow p-0 flex-column"}>
          <div className={"d-flex justify-content-center"}>
            <img src={item.image} className={"hw-reported-img"}></img>
          </div>
          <div className={"p-25"}>
            <h1 className={"m-0 p-0 ps-1"}>{item.make} {item.model}</h1>
            <hr className={"m-1 p-0"}></hr>
            <div className={"hw-reported-details ps-2 pb-2"}>
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
      </Link>
    </div>

  )
}