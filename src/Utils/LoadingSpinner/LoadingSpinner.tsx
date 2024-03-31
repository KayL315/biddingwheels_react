import React from "react";

export const LoadingSpinner : React.FC = ()=>{
  return(
    <div className={"m-5 d-flex justify-content-center- align-items-center"}>
      <div className={"spinner-border"} role={"status"}>
        <span className={"sr-only"}></span>
      </div>
      <p className={"p-0 m-0 ms-3 h5"}>Retrieving information from the database, please wait patiently...</p>
    </div>
  )
}