import React, {useEffect, useState} from "react";
import "./AdminReports.css";
import {ReportedItem} from "../Components/ReportedItemCard/ReportedItem";
import {LoadingSpinner} from "../Utils/LoadingSpinner/LoadingSpinner";
import {ErrorAlert} from "../Utils/ErrorAlert/ErrorAlert";
import {NavigateFunction, useNavigate} from "react-router";

export const AdminReports : React.FC<{}> = ()=>{
  // Handles if current user is admin
  const isAdmin = true;
  const navigator :NavigateFunction = useNavigate();
  // Either to home page or log user out and log in again
  if(!isAdmin){
    navigator("/login")
  }

  // Items to be displayed
  const [items, setItems] = useState<[]>([]);
  // Error to be displayed (if any)
  const [error, setError] = useState<string>("");
  // If data still loading
  const [loading, setLoading] = useState<boolean>(true);




  


  useEffect(()=>{
    const fetchItems = async ()=>{
      try{
         
        const SERVER_URL : string | undefined = process.env.REACT_APP_SERVER_URL;
        if(!SERVER_URL){
          setError("SERVER_URL not retrieved correctly!");
        }
        const URL: string = SERVER_URL + "/reported-items";
        const response = await fetch(URL);
          const data = await response.json();
          if(data){
            setItems(data);
          }
          setError("");
      } catch(exception : unknown){
        if(exception instanceof  Error){
          setError(exception.message);
        } else{
          setError("Unknown error occurred.");
        }
      } finally {
        setLoading(false);
      }

    }
      fetchItems();
    }, []);


  return(
    loading ?
      <LoadingSpinner/>
      :
      <div>
        {error ? <ErrorAlert msg={error}/> : <></>}
        <h1>Admin Reports Page</h1>
        <h2 className={"ms-5"}> Reported Items ({items.length})</h2>
        <hr className={"ms-5 me-5"}/>
        <div  className={"m-5 mt-0 d-flex flex-column justify-content-center align-items-start"}>
          {
            items.map((c : any)=>(
              <ReportedItem item={c}/>
            ))
          }
        </div>
      </div>
  )

}