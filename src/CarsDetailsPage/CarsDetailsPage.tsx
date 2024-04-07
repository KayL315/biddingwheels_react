import React, { useState, useEffect, FormEvent } from "react";
import { Link, useParams } from "react-router-dom";
import "./CarsDetailsPage.css";
import {CarListing} from "../Interface/CarListing";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

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

const checkUserSession = async () => {
  try {
    const response = await axios.get<any>('http://localhost:8000/check_session', { withCredentials: true });
    return response.status === 200;
  } catch (error) {
    return false;
  }
};

export const CarsDetailsPage: React.FC = () => {
  const [carDetails, setCarDetails] = useState<CarListing | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const { listid } = useParams<{ listid: string }>();
  const [showReportForm, setShowReportForm] = useState(false);
  const [reportDescription, setReportDescription] = useState('');
  const [bid, setBid] = useState<number>(0);
  const navigate = useNavigate();
  const [showMessageForm, setShowMessageForm] = useState(false);
  const [messageDescription, setMessageDescription] = useState('');

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
    checkUserSession().then(loggedIn => setIsLoggedIn(loggedIn));
  }, [listid]);
  
  // const handleInteraction = async (action: () => Promise<void>) => {
  //   const isLoggedIn = await checkUserSession();
  //   if (!isLoggedIn) {
  //     navigate('/login');
  //   } else {
  //     action();
  //   }
  // };

  if (loading) {
    return <p>Loading car details...</p>;
  }

  if (!carDetails) {
    return <p>Car not found!</p>;
  }

  const car = carDetails;

  const handleBidSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // handleInteraction(async () => {
      if (bid <= parseFloat(formattedHighestBid)) {
        alert("Your bid must be higher than the current highest bid.");
        return;
      }
  
      const bidData = {
        bid: bid,
        listing_id: car.listid
      };
  
      try {
        const response = await axios.post(`http://localhost:8000/submit-bid`, bidData, { withCredentials: true });
        alert(response.data.message);
        setCarDetails({...carDetails, highestBid: bid, highestBidHolderUsername: response.data.highestBidHolderUsername}); 
        console.log(response.data);
      } catch (error) {
        console.error('Error placing bid:', error);
      }
    // });
  };

  const formattedStartingPrice = typeof car.startingPrice === 'number'
  ? car.startingPrice.toFixed(2)
  : parseFloat(car.startingPrice).toFixed(2);

  const formattedHighestBid = typeof car.highestBid === 'number' 
  ? car.highestBid.toFixed(2) 
  : parseFloat(car.highestBid || '0').toFixed(2);

  const handleReportClick = () => {
    // handleInteraction(async () => {
      setShowReportForm(true);
    // });
  };

  const handleReportSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const reportData = {
      description: reportDescription,
      listing_id: car.listid
    };

    try {
      const response = await axios.post(
        `http://localhost:8000/post-report`, 
        JSON.stringify(reportData), // Ensuring data is in JSON format
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json' // Setting Content-Type header
          }
        }
      );
      alert("Report submitted successfully");
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

  //发消息的两个处理函数
  const handleSendClick = () => {
    setShowMessageForm(true);
  };

const handleSendSubmit = async (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const isLogged = await checkUserSession();
  console.log(isLogged);
  try {
    const response = await axios.get('http://localhost:8000/check_id', { withCredentials: true });
    const userData = response.data;
    const user_id = userData.user_id;
    console.log('User ID:', user_id);
    const messageData = {
      description: messageDescription,
      receiver_id: car.seller,
      user_id: user_id
    };
  console.log(typeof messageDescription); 
  console.log(typeof car.seller); 
  console.log('Sending message data:', messageData); 
  const jsonData = JSON.stringify(messageData);
  
    const sendMessageResponse = await axios.post('http://localhost:8000/send_message', jsonData, {
  headers: {
    'Content-Type': 'application/json'
  }
});
    console.log('Message sent successfully:', sendMessageResponse.data);
    alert("Message sent successfully");
  } catch (error: any) {
    if (error.response.status === 401) {
      console.log('User is not logged in. Please log in to send a message.');
    } else {
      console.error('Failed to send message:', error);
    }
    console.error('Failed to send message:', error);
  }
};

  return (
    <div className="car-listing">
      <h2>{car.make} - {car.model} ({car.year})</h2>
      <img src={car.image} alt={`${car.make} ${car.model}`} />
      <p>
        <strong>Seller:</strong> 
        <Link to={`/other_profile/${car.sellerUsername}/`}>{car.sellerUsername}</Link>
      </p>
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
        <br />
        <p>
        <strong>Highest Bid Holder:</strong>
        {car.highestBidHolderUsername ? (
          <Link to={`/other_profile/${car.highestBidHolderUsername}/`}>
            {car.highestBidHolderUsername}
          </Link>
        ) : (
          "No highest bid holder"
        )}
      </p>
        {isLoggedIn && (
          <>
          <form onSubmit={handleBidSubmit}>
          <input
            type="number"
            value={bid}
            onChange={(e) => setBid(parseFloat(e.target.value))}
            placeholder="Enter your bid"
          />
          <button type="submit" className="place-bid-button">Place Bid</button>
        </form>
          </>
        )}
      </div>
      <p><strong>Bidding Deadline:</strong> {new Date(car.biddingDeadline).toLocaleString()}</p>
      {isLoggedIn && (
        <>
        <button onClick={handleReportClick} className="report-button">Report This Listing</button>
        {showReportForm && (
          <form onSubmit={handleReportSubmit}>
            <textarea
              value={reportDescription}
              onChange={(e) => setReportDescription(e.target.value)}
              placeholder="Describe the issue"
            />
            <button type="submit" className="report-button">Submit Report</button>
          </form>
        )}


        <button onClick={handleSendClick} className="send-button">Send Message to the Seller</button>
        {showMessageForm && (
          <form onSubmit={handleSendSubmit}>
            <textarea
              value={messageDescription}
              onChange={(e) => setMessageDescription(e.target.value)}
              // placeholder="Describe the issue"
            />
            <button type="submit" className="send-button">Send</button>
          </form>)}
        </>

      )}
    </div>
  );
}
