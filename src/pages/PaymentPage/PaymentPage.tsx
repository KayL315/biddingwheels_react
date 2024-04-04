import "./PaymentPage.css";

import React, { useState } from "react";

export const PaymentPage = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        email: "",
        address: "",
        city: "",
        state: "",
        zip: "",
        cardName: "",
        cardNumber: "",
        expMonth: "",
        expYear: "",
        cvv: "",
        sameAddress: true,
    });

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
                    {/* <label htmlFor="fname" className="fa fa-user">
                        Full Name
                    </label> */}
                    <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
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
                    <button
                    className="payment-confirm-btn"
                        onClick={(e) => {
                            e.preventDefault();
                            handleSubmit();
                        }}
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};
