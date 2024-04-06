import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { CarListing } from '../Interface/CarListing';
import "./PostListing.css";
import axios from "axios";

const API_URL = process.env.REACT_APP_SERVER_URL;

const fetchUserId = async () => {
  try {
    const response = await axios.get('http://localhost:8000/check_session', { withCredentials: true });
    if (response.status === 200 && response.data.user_id) {
      return response.data.user_id;
    }
    return null;
  } catch (error) {
    console.error('Error fetching user ID:', error);
    return null;
  }
};

export const PostListing: React.FC = () => {
  const [userId, setUserId] = useState<number | null>(null);
  const [newListing, setNewListing] = useState<CarListing>({
    listid: 0,
    licenseNumber: '',
    engineSerialNumber: '',
    make: '',
    model: '',
    year: new Date().getFullYear(),
    mileage: 0,
    city: '',
    color: '',
    additionalFeatures: '',
    description: '',
    startingPrice: 0,
    biddingDeadline: '',
    highestBid: 0,
    highestBidHolder: -1,
    seller: -1,
    image: '',
  });

  useEffect(() => {
    const initializeUserId = async () => {
      const id = await fetchUserId();
      if (id !== null) {
        setUserId(id);
        setNewListing(prev => ({ ...prev, seller: id }));
      }
    };
    
    initializeUserId();
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === "year" || name === "mileage" || name === "startingPrice") {
      setNewListing({
        ...newListing,
        [name]: Number(value)
      });
    } else {
      setNewListing({
        ...newListing,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const listingToSubmit = {
      ...newListing,
      highestBid: newListing.startingPrice,
    };
    try {
      const response = await axios.post(
        'http://localhost:8000/post-listing',
        listingToSubmit,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      console.log(response.data);
      alert('Listing posted successfully!');
    } catch (error) {
      console.error('There was a problem submitting the listing:', error);
      alert('Failed to post the listing. Please try again.');
    }
  };

  return (
    <div className="post-listing">
      <form onSubmit={handleSubmit}>
        <label>License Number:</label>
        <input type="text" name="licenseNumber" value={newListing.licenseNumber} 
        onChange={handleInputChange} placeholder="License Number" />
        <label>Engine Serial Number:</label>
        <input type="text" name="engineSerialNumber" value={newListing.engineSerialNumber} 
        onChange={handleInputChange} placeholder="Engine Serial Number" />
        <label>Make:</label>
        <input type="text" name="make" value={newListing.make} 
        onChange={handleInputChange} placeholder="Make" />
        <label>Model:</label>
        <input type="text" name="model" value={newListing.model} 
        onChange={handleInputChange} placeholder="Model" />
        <label>Year:</label>
        <input type="number" name="year" value={newListing.year} 
        onChange={handleInputChange} placeholder="Year" />
        <label>Mileage:</label>
        <input type="text" name="mileage" value={newListing.mileage} 
        onChange={handleInputChange} placeholder="Mileage" />
        <label>City:</label>
        <input type="text" name="city" value={newListing.city} 
        onChange={handleInputChange} placeholder="City" />
        <label>Color:</label>
        <input type="text" name="color" value={newListing.color} 
        onChange={handleInputChange} placeholder="Color" />
        <label>Additional Features:</label>
        <input type="text" name="additionalFeatures" 
        value={newListing.additionalFeatures} 
        onChange={handleInputChange} placeholder="Additional Features (comma-separated)" />
        <label>Description:</label>
        <textarea name="description" value={newListing.description} 
        onChange={handleInputChange} placeholder="Description"></textarea>
        <label>Starting Price:</label>
        <input type="number" name="startingPrice" value={newListing.startingPrice} 
        onChange={handleInputChange} placeholder="Starting Price" />
        <label>Bidding Deadline:</label>
        <input type="text" name="biddingDeadline" value={newListing.biddingDeadline} 
        onChange={handleInputChange} placeholder="Bidding Deadline" />
        <label>Image URL:</label>
        <input type="text" name="image" value={newListing.image} 
        onChange={handleInputChange} placeholder="Image URL" />
        <button type="submit">Submit Listing</button>
      </form>
    </div>
  );
};
