import React, { useState, ChangeEvent, FormEvent } from "react";
import { CarListing } from '../Interface/CarListing';
import "./PostListing.css";

export const PostListing: React.FC = () => {
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
    // Submit newListing to server or backend
    try {
      const response = await fetch('http://localhost:8000/api/post-car-listing/', { // Replace with your API endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newListing)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      // Handle success here (e.g., redirect or show a success message)
    } catch (error) {
      console.error('There was a problem submitting the listing:', error);
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
        <label>Highest Bid:</label>
        <input type="text" name="image" value={newListing.image} 
        onChange={handleInputChange} placeholder="Image URL" />
        <button type="submit">Submit Listing</button>
      </form>
    </div>
  );
};
