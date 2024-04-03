import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./CarsDetailsPage.css";
import {CarListing} from "../Interface/CarListing";

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
    </div>
  );
}
