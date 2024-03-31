export interface CarListing {
    listid: number;
    licenseNumber: string;
    engineSerialNumber: string;
    makeType: string;
    model: string;
    year: number;
    mileage: string;
    city: string;
    color: string;
    additionalFeatures: string[];
    description: string;
    startingPrice: number;
    biddingDeadline: string;
    highestBid: number;
    image: string;
}