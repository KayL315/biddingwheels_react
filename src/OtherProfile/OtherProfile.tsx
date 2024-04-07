// OtherUserProfile.tsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link, useParams } from 'react-router-dom';
import './OtherProfile.css';

interface Listing {
    listid: number;
    licenseNumber: string;
    engineSerialNumber: string;
    make: string;
    model: string;
    year: number;
    mileage: number;
    city: string;
    color: string;
    additionalFeatures: string;
    description: string;
    startingPrice: number;
    biddingDeadline: string;
    highestBid: number;
    highestBidHolder: string;
    image: string;
  }
  

interface UserData {
  username: string;
  listings: Listing[];
}

const OtherProfile: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const [otherUserData, setOtherUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchOtherProfile = async () => {
      try {
        console.log('Fetching other user profile for:', username);
        const response = await axios.get<UserData>(`http://localhost:8000/other_profile/${username}`);
        console.log('Response from server:', response.data);
        setOtherUserData(response.data);
      } catch (error) {
        console.error('Failed to fetch other user profile:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOtherProfile();
  }, [username]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!otherUserData) {
    return <div>User not found</div>;
  }
  if (!otherUserData.listings) {
    return <div>No listings found for this user.</div>;
  }
  if (!Array.isArray(otherUserData.listings)) {
    return <div>Not a list</div>;
  }

  return (
    <div>
      <div className="other-profile-page-container">
        <h2 className="other-profile-title">{otherUserData.username}'s Profile</h2>
        <div className="other-profile-card-container">
          {otherUserData.listings.map((listing) => (
            <Link to={`/list/${listing.listid}`} key={listing.listid} className="other-profile-card-link">
              <div className="other-profile-card">
                <img src={listing.image} alt="Car" className="other-profile-card-image" />
                <div className="other-profile-card-details">
                  <h4 className="other-profile-subtitle">{listing.model}</h4>
                  <p className="other-profile-text">License Number: {listing.licenseNumber}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
  
  
};

export default OtherProfile;
