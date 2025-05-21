export type UserType = {
  _id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  country?: string;
  img?: string;
  city?: string;
  phone?: string;
  isAdmin?: boolean;
};

export type HotelType = {
  _id: string;
  userId: string;
  name: string;
  city: string;
  country: string;
  description: string;
  type: string;
  adultCount: number;
  childCount: number;
  facilities: string[];
  pricePerNight: number;
  starRating: number;
  imageUrls: string[];
  lastUpdated: Date;
  bookings: BookingType[];
  rooms: string[];
};

export type RoomType = {
  _id: string;
  title: string;
  price: number;
  maxPeople: number;
  desc: string;
  roomNumbers: {
    number: number;
    unavailableDates: Date[];
  }[];
  createdAt: string;
  updatedAt: string;
  hotelId: string;
};


export type BookingType = {
  _id: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  adultCount: number;
  childCount: number;
  checkIn: Date;
  checkOut: Date;
  totalCost: number;
};

export type HotelSearchResponse = {
  data: HotelType[];
  pagination: {
    total: number;
    page: number;
    pages: number;
  };
};

export type PaymentIntentRequest = {
  numberOfNights: string;
  totalPrice?: number;
  roomIds: string[]; 
  checkIn: Date;    
  checkOut: Date;   
};

export type PaymentIntentResponse = {
  paymentIntentId: string;
  clientSecret: string;
  totalCost: number;
  rooms: {  
    roomId: string;
    title: string;
    price: number;
  }[];
};

export type ReservationData = {
  hotelId: string;
  roomIds: string[];
  dates: number[];
  totalPrice: number;
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
  selectedRooms: {
    roomId: string;
    roomNumber: string;
    price: number;
    title: string;
  }[];
};
