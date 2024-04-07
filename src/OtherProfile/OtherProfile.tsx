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
  user_id: number;
  listings: Listing[];
}

const OtherProfile: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const [otherUserData, setOtherUserData] = useState<UserData | null>(null);
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [canRateAsBuyer, setCanRateAsBuyer] = useState<boolean>(false);
  const [canRateAsSeller, setCanRateAsSeller] = useState<boolean>(false);
  const [buyerRating, setBuyerRating] = useState<number>(5);
  const [sellerRating, setSellerRating] = useState<number>(5);
  const [userRating, setUserRating] = useState<number>(5);
  const [ratingSubmitted, setRatingSubmitted] = useState<boolean>(false);

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

  useEffect(() => {
    const checkUserSession = async () => {
      try {
        const response = await axios.get<any>('http://localhost:8000/check_session', { withCredentials: true });
        if (response.status === 200 && response.data && response.data.user_id) {
          setCurrentUserId(response.data.user_id);
        }
      } catch (error) {
        console.error('Error checking user session:', error);
      }
    };

    checkUserSession();
  }, []);

  useEffect(() => {
    const checkRatingEligibility = async () => {
      if (otherUserData && currentUserId) {
        // Check if the user can rate as a buyer
        try {
          const responseBuyer = await axios.post(`http://localhost:8000/can_rate`, {
            owner: otherUserData.user_id,
            buyer: currentUserId,
            rater: currentUserId,
            rated: otherUserData.user_id,
          });
          setCanRateAsBuyer(responseBuyer.status === 200);
        } catch (error) {
          console.error('Error checking buyer rating eligibility:', error);
        }

        // Check if the user can rate as a seller
        try {
          const responseSeller = await axios.post(`http://localhost:8000/can_rate`,{
            owner: currentUserId,
            buyer: otherUserData.user_id,
            rater: currentUserId,
            rated: otherUserData.user_id,
          });
          setCanRateAsSeller(responseSeller.status === 200);
        } catch (error) {
          console.error('Error checking seller rating eligibility:', error);
        }
      }
    };
    if (otherUserData && currentUserId) {
      checkRatingEligibility();
    }
  }, [otherUserData, currentUserId]);

  useEffect(() => {
    const fetchUserRating = async () => {
      if (otherUserData) {
        try {
          const response = await axios.get(`http://localhost:8000/fetch_rating/${otherUserData.user_id}`);
          setUserRating(response.data);
        } catch (error) {
          console.error('Failed to fetch user rating:', error);
        }
      }
    };

    fetchUserRating();
  }, [otherUserData]);



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
  const handleBuyerRatingChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setBuyerRating(parseInt(event.target.value));
  };

  const handleSellerRatingChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSellerRating(parseInt(event.target.value));
  };

  const submitRating = async (ratingRole: 'buyer' | 'seller') => {
    if (otherUserData && currentUserId) {
      const rating = ratingRole === 'buyer' ? buyerRating : sellerRating;
      try {
        await axios.put(`http://localhost:8000/add_rating`, {
          rater: currentUserId,
          rated: otherUserData.user_id,
          rating,
        });
        setRatingSubmitted(true); 
      } catch (error) {
        console.error(`Error submitting ${ratingRole} rating:`, error);
      }
    }
  };


  return (
    <div>
      <div className="other-profile-page-container">
        <h2 className="other-profile-title">{otherUserData.username}'s Profile</h2>
        <p>Average Rating: {userRating}</p>
        <div>
          {canRateAsBuyer && !ratingSubmitted && (
            <div>
              <label>Rate as Buyer:</label>
              <select value={buyerRating} onChange={handleBuyerRatingChange}>
                {[1, 2, 3, 4, 5].map(num => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
              <button onClick={() => submitRating('buyer')}>Submit Rating</button>
            </div>
          )}
          {canRateAsSeller && !ratingSubmitted && (
            <div>
              <label>Rate as Seller:</label>
              <select value={sellerRating} onChange={handleSellerRatingChange}>
                {[1, 2, 3, 4, 5].map(num => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
              <button onClick={() => submitRating('seller')}>Submit Rating</button>
            </div>
          )}
        </div>
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
