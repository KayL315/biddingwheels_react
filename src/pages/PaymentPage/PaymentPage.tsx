import "./PaymentPage.css";

import React, { useEffect, useState } from "react";
import { ItemCard } from "../../Components/ItemList";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useNavigate } from "react-router";

export const PaymentPage = () => {
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        address: "",
        city: "",
        state: "",
        zip: "",
        cardName: "",
        cardNumber: "",
        expMonth: "",
        expYear: "",
        cvv: ""
    });
    const navigate = useNavigate();

    const isLogin = useSelector((state: RootState) => state.user.isLogin);
    const currentCar = useSelector((state: RootState) => state.cars.carList[0]);

    useEffect(() => {
        if (!isLogin) {
            console.log("Not logged in");
            navigate("/LogIn");
            return;
        }
        if (!currentCar) {
            navigate("/");
            return;
        }
    }, [isLogin, currentCar, navigate]);

    const checkEmeptyData = () => {
        return Object.values(formData).some((value) => value === "");
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = () => {
        console.log(formData);
        // Submit your form data...
    };

    return (
        <div className="payment-container">
            {currentCar && (
                <div className="payment-car-detail-container">
                    <div className="payment-car-detail">
                        <ItemCard {...currentCar} />
                    </div>
                </div>
            )}
            <form>
                <div className="payment-section">
                    <h2>Payment Method</h2>
                    <div className="payment-credit-card">
                        <input
                            type="text"
                            name="cardName"
                            value={formData.cardName}
                            onChange={handleChange}
                            placeholder="Card Name"
                            required
                        />
                        <input
                            type="text"
                            name="cardNumber"
                            value={formData.cardNumber}
                            onChange={handleChange}
                            placeholder="Card Number"
                            required
                        />
                        <input
                            type="text"
                            name="expMonth"
                            value={formData.expMonth}
                            onChange={handleChange}
                            placeholder="Exp Month"
                            required
                        />
                        <input
                            type="text"
                            name="expYear"
                            value={formData.expYear}
                            onChange={handleChange}
                            placeholder="Exp Year"
                            required
                        />
                        <input
                            type="text"
                            name="cvv"
                            value={formData.cvv}
                            onChange={handleChange}
                            placeholder="CVV"
                            required
                        />
                    </div>
                </div>
                <div className="payment-section">
                    <h2>Shipping Address</h2>
                    <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="Full Name"
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Email"
                        required
                    />
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Address"
                        required
                    />
                    <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="City"
                        required
                    />
                    <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        placeholder="State"
                        required
                    />
                    <input
                        type="text"
                        name="zip"
                        value={formData.zip}
                        onChange={handleChange}
                        placeholder="Zip"
                        required
                    />
                </div>
                <div className="payment-confirm-btn-container">
                    <div className="payment-confirm-btn">
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                handleSubmit();
                            }}
                            disabled={checkEmeptyData()}
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};
