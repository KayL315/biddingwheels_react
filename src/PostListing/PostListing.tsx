import React, { useState, ChangeEvent, FormEvent } from "react";
import { CarListing } from '../Interface/CarListing';
import "./PostListing.css";

export const PostListing: React.FC = () => {
  const [newListing, setNewListing] = useState<CarListing>({
    listid: 0,
    licenseNumber: '',
    engineSerialNumber: '',
    makeType: '',
    model: '',
    year: new Date().getFullYear(),
    mileage: '',
    city: '',
    color: '',
    additionalFeatures: [],
    description: '',
    startingPrice: 0,
    biddingDeadline: '',
    highestBid: 0,
    image: ''
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === "additionalFeatures") {
      setNewListing({
        ...newListing,
        additionalFeatures: value.split(',').map(feature => feature.trim())
      });
    } else {
      setNewListing({
        ...newListing,
        [name]: value
      });
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Submit newListing to server or backend
    console.log(newListing);
  };

  return (
    <div className="post-listing">
      <form onSubmit={handleSubmit}>
        <input type="text" name="licenseNumber" value={newListing.licenseNumber} 
        onChange={handleInputChange} placeholder="License Number" />
        <input type="text" name="engineSerialNumber" value={newListing.engineSerialNumber} 
        onChange={handleInputChange} placeholder="Engine Serial Number" />
        <input type="text" name="makeType" value={newListing.makeType} 
        onChange={handleInputChange} placeholder="Make Type" />
        <input type="text" name="model" value={newListing.model} 
        onChange={handleInputChange} placeholder="Model" />
        <input type="number" name="year" value={newListing.year} 
        onChange={handleInputChange} placeholder="Year" />
        <input type="text" name="mileage" value={newListing.mileage} 
        onChange={handleInputChange} placeholder="Mileage" />
        <input type="text" name="city" value={newListing.city} 
        onChange={handleInputChange} placeholder="City" />
        <input type="text" name="color" value={newListing.color} 
        onChange={handleInputChange} placeholder="Color" />
        <input type="text" name="additionalFeatures" 
        value={newListing.additionalFeatures.join(', ')} 
        onChange={handleInputChange} placeholder="Additional Features (comma-separated)" />
        <textarea name="description" value={newListing.description} 
        onChange={handleInputChange} placeholder="Description"></textarea>
        <input type="number" name="startingPrice" value={newListing.startingPrice} 
        onChange={handleInputChange} placeholder="Starting Price" />
        <input type="text" name="biddingDeadline" value={newListing.biddingDeadline} 
        onChange={handleInputChange} placeholder="Bidding Deadline" />
        <input type="text" name="image" value={newListing.image} 
        onChange={handleInputChange} placeholder="Image URL" />
        <button type="submit">Submit Listing</button>
      </form>
    </div>
  );
};
