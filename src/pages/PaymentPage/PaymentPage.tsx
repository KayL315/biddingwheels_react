import "./PaymentPage.css";

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { EmptyIconButton } from "../../Components/IconButton";
import { IoIosAddCircleOutline } from "react-icons/io";
import { RiDeleteBin5Line } from "react-icons/ri";

export type CardInfoType = {
    payment_id: number;
    cardName: string;
    cardNumber: string;
    expMonth: string;
    expYear: string;
    cvv: string;
};

export type AddressInfoType = {
    address_id: number;
    fullName: string;
    email: string;
    address: string;
    city: string;
    state: string;
    zip: string;
};

export type CardInfoProps = {
    cards: CardInfoType[];
};

export interface PaymentPageProps {
    cardInfo: CardInfoType;
    addressInfo: AddressInfoType;
    setCardInfo: (cardInfo: CardInfoType) => void;
    setAddressInfo: (addressInfo: AddressInfoType) => void;
}

export const PaymentPage = (props: PaymentPageProps) => {
    const { cardInfo, setCardInfo, addressInfo, setAddressInfo } = props;
    const user_id = useSelector((state: RootState) => state.user.user_id);

    const [preCardInfo, setPreCardInfo] = useState<CardInfoType[]>(
        [] as CardInfoType[]
    );

    const [preAddressInfo, setPreAddressInfo] = useState<AddressInfoType[]>(
        [] as AddressInfoType[]
    );

    const checkEmeptyAddressData = () => {
        return Object.values(addressInfo).some((value) => value === "");
    };

    const checkEmeptyCardData = () => {
        return Object.values(cardInfo).some((value) => value === "");
    };

    const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setAddressInfo({ ...addressInfo, [name]: value });
    };

    const handleCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCardInfo({ ...cardInfo, [name]: value });
    };

    const handleAddNewCard = async () => {
        try {
            if (checkEmeptyCardData()) {
                return;
            }
            const response = await fetch("http://localhost:8000/card-info", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...cardInfo,
                    user_id: user_id,
                }),
            });
            const data = await response.json();
            console.log(data);
            setPreCardInfo([...preCardInfo, data.cardInfo[0]]);
            setCardInfo({...data.cardInfo[0]})
        } catch (error) {
            console.error("Failed to add new card:", error);
        }
    };

    const handleAddNewAddress = async () => {
        try {
            if (checkEmeptyAddressData()) {
                return;
            }
            const response = await fetch("http://localhost:8000/address-info", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ...addressInfo,
                    user_id: user_id,
                }),
            });
            const data = await response.json();
            setPreAddressInfo([...preAddressInfo, data.address[0]]);
            setAddressInfo({...data.address[0]})
        } catch (error) {
            console.error("Failed to add new card:", error);
        }
    };

    const handleDeleteCard = async (payment_id: number) => {
        try {
            const response = await fetch("http://localhost:8000/card-info", {
                method: "DELETE",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    payment_id: payment_id,
                }),
            });

            if (response.ok) {
                const newCardInfo = preCardInfo.filter(
                    (card) => card.payment_id !== payment_id
                );
                setPreCardInfo(newCardInfo);
            }
        } catch (error) {
            console.error("Failed to add new card:", error);
        }
    };

    const handleDeleteAddress = async (address_id: number) => {
        try {
            const response = await fetch("http://localhost:8000/address-info", {
                method: "DELETE",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    address_id: address_id,
                }),
            });

            if (response.ok) {
                const newAddressInfo = preAddressInfo.filter(
                    (address) => address.address_id !== address_id
                );
                setPreAddressInfo(newAddressInfo);
            }
        } catch (error) {
            console.error("Failed to add new card:", error);
        }
    };

    useEffect(() => {
        const fecthPaymentInfo = async () => {
            try {
                const response = await fetch(
                    "http://localhost:8000/fetch-payment-info",
                    {
                        method: "POST",
                        credentials: "include",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            user_id: user_id,
                        }),
                    }
                );
                const data = await response.json();
                setPreCardInfo(data.cardInfo);
                setPreAddressInfo(data.addressInfo);
            } catch (error) {
                console.error("Failed to fetch payment info:", error);
            }
        };
        fecthPaymentInfo();
    }, [
        user_id,
        setCardInfo,
        setPreCardInfo,
        setPreAddressInfo,
        setAddressInfo,
    ]);

    return (
        <div className="payment-container">
            <div className="payment-section">
                <h2>Payment Method</h2>
                {preCardInfo.length > 0 &&
                    preCardInfo.map((card, index) => (
                        <div
                            key={card.payment_id}
                            className="pre-card-container"
                        >
                            <EmptyIconButton
                                icon={<RiDeleteBin5Line />}
                                onClick={() => {
                                    handleDeleteCard(card.payment_id);
                                }}
                            />
                            <div>{card.cardName}</div>
                            <div>{card.cardNumber}</div>
                            <div>{card.expMonth}</div>
                            <div>{card.expYear}</div>
                            <div>{card.cvv}</div>
                            <EmptyIconButton
                                icon={<IoIosAddCircleOutline />}
                                onClick={() => {
                                    setCardInfo(preCardInfo[index]);
                                }}
                            />
                        </div>
                    ))}
                <div className="payment-credit-card">
                    <form>
                        <input
                            type="text"
                            name="cardName"
                            value={cardInfo.cardName}
                            onChange={handleCardChange}
                            placeholder="Card Name"
                            required
                        />
                        <input
                            type="text"
                            name="cardNumber"
                            value={cardInfo.cardNumber}
                            onChange={handleCardChange}
                            placeholder="Card Number"
                            required
                        />
                        <input
                            type="text"
                            name="expMonth"
                            value={cardInfo.expMonth}
                            onChange={handleCardChange}
                            placeholder="Exp Month"
                            required
                        />
                        <input
                            type="text"
                            name="expYear"
                            value={cardInfo.expYear}
                            onChange={handleCardChange}
                            placeholder="Exp Year"
                            required
                        />
                        <input
                            type="text"
                            name="cvv"
                            value={cardInfo.cvv}
                            onChange={handleCardChange}
                            placeholder="CVV"
                            required
                        />
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                handleAddNewCard();
                            }}
                            disabled={checkEmeptyCardData()}
                        >
                            Add New Card
                        </button>
                    </form>
                </div>
            </div>
            <div className="payment-section">
                <h2>Shipping Address</h2>
                {preAddressInfo.length > 0 && (
                    <div className="payment-address">
                        {preAddressInfo.map((address, index) => (
                            <div
                                key={address.address_id}
                                className="pre-address-container"
                            >
                                <EmptyIconButton
                                    icon={<RiDeleteBin5Line />}
                                    onClick={() => {
                                        handleDeleteAddress(address.address_id);
                                    }}
                                />
                                <div>{address.fullName}</div>
                                <div>{address.email}</div>
                                <div>{address.address}</div>
                                <div>{address.city}</div>
                                <div>{address.state}</div>
                                <div>{address.zip}</div>
                                <EmptyIconButton
                                    icon={<IoIosAddCircleOutline />}
                                    onClick={() => {
                                        setAddressInfo(preAddressInfo[index]);
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                )}
                <form>
                    <input
                        type="text"
                        name="fullName"
                        value={addressInfo.fullName}
                        onChange={handleAddressChange}
                        placeholder="Full Name"
                        required
                    />
                    <input
                        type="email"
                        name="email"
                        value={addressInfo.email}
                        onChange={handleAddressChange}
                        placeholder="Email"
                        required
                    />
                    <input
                        type="text"
                        name="address"
                        value={addressInfo.address}
                        onChange={handleAddressChange}
                        placeholder="Address"
                        required
                    />
                    <input
                        type="text"
                        name="city"
                        value={addressInfo.city}
                        onChange={handleAddressChange}
                        placeholder="City"
                        required
                    />
                    <input
                        type="text"
                        name="state"
                        value={addressInfo.state}
                        onChange={handleAddressChange}
                        placeholder="State"
                        required
                    />
                    <input
                        type="text"
                        name="zip"
                        value={addressInfo.zip}
                        onChange={handleAddressChange}
                        placeholder="Zip"
                        required
                    />
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            handleAddNewAddress();
                        }}
                        disabled={checkEmeptyAddressData()}
                    >
                        Add New Address
                    </button>
                </form>
            </div>
        </div>
    );
};
