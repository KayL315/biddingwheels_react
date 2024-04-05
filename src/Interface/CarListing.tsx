export interface CarListing {
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

    // User ID
    highestBidHolder:number;
    seller:number;
    sellerUsername?: string;

    highestBidHolderUsername?: string;
    image: string;
}