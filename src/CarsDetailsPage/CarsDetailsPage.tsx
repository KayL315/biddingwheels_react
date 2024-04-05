import React, { useState, useEffect, FormEvent } from "react";
import { useParams } from "react-router-dom";
import "./CarsDetailsPage.css";
import {CarListing} from "../Interface/CarListing";
import axios from 'axios';

const API_URL = process.env.REACT_APP_SERVER_URL;
async function getCarListing(listid: string): Promise<CarListing> {
  try {
    const response = await fetch(`${API_URL}/car-details/${listid}/`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching data: ', error);
    throw error;
  }
}


export const CarsDetailsPage: React.FC = () => {
  const [carDetails, setCarDetails] = useState<CarListing | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { listid } = useParams<{ listid: string }>();
  const [showReportForm, setShowReportForm] = useState(false);
  const [reportDescription, setReportDescription] = useState('');

  useEffect(() => {
    if (listid) {
      getCarListing(listid).then(car => {
        setCarDetails(car);
        setLoading(false);
      }).catch(() => {
        setCarDetails(null);
        setLoading(false);
      });
    }
  }, [listid]);
  

  if (loading) {
    return <p>Loading car details...</p>;
  }

  if (!carDetails) {
    return <p>Car not found!</p>;
  }

  const car = carDetails;

  const formattedStartingPrice = typeof car.startingPrice === 'number'
  ? car.startingPrice.toFixed(2)
  : parseFloat(car.startingPrice).toFixed(2);

  const formattedHighestBid = typeof car.highestBid === 'number' 
  ? car.highestBid.toFixed(2) 
  : parseFloat(car.highestBid || '0').toFixed(2);

  const handleReportClick = () => {
    setShowReportForm(true);
  };

  const handleReportSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const reportData = {
      reporter_id: 1,
      description: reportDescription,
      listing_id: car.listid
    };
    console.log(reportData)
  
    try {
      const response = await axios.post(`${API_URL}/post-report`, reportData);
      // Handle success here
      console.log(response.data); // The response data from Axios
      setReportDescription('');
      setShowReportForm(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Now we know for sure this is an Axios error
        const serverResponse = error.response;
        console.error('There was a problem submitting the report:', serverResponse?.statusText);
        console.error('Error data:', serverResponse?.data);
      } else {
        // Handle non-Axios errors
        console.error('An unexpected error occurred:', error);
      }
    }
  };


  return (
    <div className="car-listing">
      <h2>{car.make} - {car.model} ({car.year})</h2>
      <img src={car.image} alt={`${car.make} ${car.model}`} />
      <p><strong>Seller:</strong> {car.sellerUsername}</p>
      <p><strong>License Number:</strong> {car.licenseNumber}</p>
      <p><strong>Engine Serial Number:</strong> {car.engineSerialNumber}</p>
      <p><strong>Mileage:</strong> {car.mileage}</p>
      <p><strong>City:</strong> {car.city}</p>
      <p><strong>Color:</strong> {car.color}</p>
      <p><strong>Additional Features:</strong> {car.additionalFeatures}</p>
      <p><strong>Description:</strong> {car.description}</p>
      <div>
        <strong>Starting Price:</strong> ${formattedStartingPrice}
        <br />
        <strong>Highest Bid:</strong> ${formattedHighestBid}
      </div>
      <p><strong>Bidding Deadline:</strong> {new Date(car.biddingDeadline).toLocaleString()}</p>
      <button onClick={handleReportClick}>Report This Listing</button>
      {showReportForm && (
        <form onSubmit={handleReportSubmit}>
          <textarea
            value={reportDescription}
            onChange={(e) => setReportDescription(e.target.value)}
            placeholder="Describe the issue"
          />
          <button type="submit">Submit Report</button>
        </form>
      )}
    </div>
  );
}
