import { RegisterFormData } from "./pages/Register";
import { SignInFormData } from "./pages/SignIn";
import {
  HotelSearchResponse,
  HotelType,
  PaymentIntentResponse,
  ReservationData,
  RoomType,
  UserType,
} from "../../backend/src/shared/types";
import { BookingFormData } from "./forms/BookingForm/BookingForm";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const fetchCurrentUser = async (): Promise<UserType> => {
  const response = await fetch(`${API_BASE_URL}/api/users/me`, {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Error fetching user");
  }
  return response.json();
};

export const register = async (formData: RegisterFormData) => {
  const response = await fetch(`${API_BASE_URL}/api/users/register`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(responseBody.message);
  }
};

export const signIn = async (formData: SignInFormData) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const body = await response.json();
  if (!response.ok) {
    throw new Error(body.message);
  }
  return body;
};

export const validateToken = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Token invalid");
  }

  return response.json();
};

export const signOut = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
    credentials: "include",
    method: "POST",
  });

  if (!response.ok) {
    throw new Error("Error during sign out");
  }
};

export const addMyHotel = async (hotelFormData: FormData) => {
  const response = await fetch(`${API_BASE_URL}/api/my-hotels`, {
    method: "POST",
    credentials: "include",
    body: hotelFormData,
  });

  if (!response.ok) {
    throw new Error("Failed to add hotel");
  }

  return response.json();
};

export const fetchMyHotels = async (): Promise<HotelType[]> => {
  const response = await fetch(`${API_BASE_URL}/api/my-hotels`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Error fetching hotels");
  }

  return response.json();
};

export const fetchMyHotelById = async (hotelId: string): Promise<HotelType> => {
  const response = await fetch(`${API_BASE_URL}/api/my-hotels/${hotelId}`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Error fetching Hotels");
  }

  return response.json();
};

export const updateMyHotelById = async (hotelFormData: FormData) => {
  const response = await fetch(
    `${API_BASE_URL}/api/my-hotels/${hotelFormData.get("hotelId")}`,
    {
      method: "PUT",
      body: hotelFormData,
      credentials: "include",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update Hotel");
  }

  return response.json();
};

export type SearchParams = {
  destination?: string;
  checkIn?: string;
  checkOut?: string;
  adultCount?: string;
  childCount?: string;
  page?: string;
  facilities?: string[];
  types?: string[];
  stars?: string[];
  maxPrice?: string;
  sortOption?: string;
};

export const searchHotels = async (
  searchParams: SearchParams
): Promise<HotelSearchResponse> => {
  const queryParams = new URLSearchParams();
  queryParams.append("destination", searchParams.destination || "");
  queryParams.append("checkIn", searchParams.checkIn || "");
  queryParams.append("checkOut", searchParams.checkOut || "");
  queryParams.append("adultCount", searchParams.adultCount || "");
  queryParams.append("childCount", searchParams.childCount || "");
  queryParams.append("page", searchParams.page || "");

  queryParams.append("maxPrice", searchParams.maxPrice || "");
  queryParams.append("sortOption", searchParams.sortOption || "");

  searchParams.facilities?.forEach((facility) =>
    queryParams.append("facilities", facility)
  );

  searchParams.types?.forEach((type) => queryParams.append("types", type));
  searchParams.stars?.forEach((star) => queryParams.append("stars", star));

  const response = await fetch(
    `${API_BASE_URL}/api/hotels/search?${queryParams}`
  );

  if (!response.ok) {
    throw new Error("Error fetching hotels");
  }

  return response.json();
};

export const fetchHotels = async (): Promise<HotelType[]> => {
  const response = await fetch(`${API_BASE_URL}/api/hotels`);
  if (!response.ok) {
    throw new Error("Error fetching hotels");
  }
  return response.json();
};

export const fetchHotelById = async (hotelId: string): Promise<HotelType> => {
  const response = await fetch(`${API_BASE_URL}/api/hotels/${hotelId}`);
  if (!response.ok) {
    throw new Error("Error fetching Hotels");
  }

  return response.json();
};

export const createPaymentIntent = async (
  hotelId: string,
  numberOfNights: string,
  reservationData: ReservationData // Accept full reservation data
): Promise<PaymentIntentResponse> => {
  const response = await fetch(
    `${API_BASE_URL}/api/hotels/${hotelId}/bookings/payment-intent`,
    {
      credentials: "include",
      method: "POST",
      body: JSON.stringify({
        numberOfNights,
        totalPrice: reservationData.totalPrice,
        roomIds: reservationData.roomIds,
        checkIn: reservationData.checkIn,
        checkOut: reservationData.checkOut
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Error fetching payment intent");
  }

  return response.json();
};

export const createRoomBooking = async (formData: BookingFormData) => {
  const response = await fetch(
    `${API_BASE_URL}/api/hotels/${formData.hotelId}/bookings`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(formData),
    }
  );

  if (!response.ok) {
    throw new Error("Error booking room");
  }
};

export const fetchMyBookings = async (): Promise<HotelType[]> => {
  const response = await fetch(`${API_BASE_URL}/api/my-bookings`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Unable to fetch bookings");
  }

  return response.json();
};

// src/api-client.ts
export const fetchUsers = async () => {
  const response = await fetch(`${API_BASE_URL}/api/my-users`, {
    credentials: "include", // if your backend is using cookies
  });

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }
  return response.json();
};


export const addUser = async (formData: FormData): Promise<UserType> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/my-users`, {
      method: "POST",
      credentials: "include",
      body: formData, // No Content-Type header for FormData - browser sets it automatically
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to add user');
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw new Error(error instanceof Error ? error.message : 'Failed to add user');
  }
};


// Add this to your api-client.ts
const handleResponse = async (response: Response) => {
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || 'Failed to fetch data');
  }
  return data;
};

export const fetchUserById = async (userId: string): Promise<UserType> => {
  const response = await fetch(`/api/users/${userId}`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return handleResponse(response);
};

export const updateUserById = async (userId: string, formData: FormData): Promise<UserType> => {
  const response = await fetch(`/api/users/${userId}`, {
    method: "PUT",
    credentials: "include",
    body: formData,
  });
  return handleResponse(response);
};

// Fetch all rooms
export const fetchRooms = async () => {
  const response = await fetch(`${API_BASE_URL}/api/my-rooms`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch rooms");
  }

  return response.json();
};

// Fetch single room by ID
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const fetchRoomById = async (_p0: string) => {
  const response = await fetch(`${API_BASE_URL}/api/my-rooms`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch room");
  }

  return response.json();
};

// Add a new room to a specific hotel
export const addRoom = async (roomData: Partial<RoomType>) => {
  const response = await fetch(`${API_BASE_URL}/api/my-rooms`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(roomData),
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to add room");
  }

  return response.json();
};


// Update a room by ID
export const updateRoom = async (roomId: string, roomData: Partial<RoomType>) => {
  const response = await fetch(`${API_BASE_URL}/api/my-rooms/${roomId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(roomData),
    
  });

  if (!response.ok) {
    throw new Error("Failed to update room");
  }

  return response.json();
};

// Update room availability
export const updateRoomAvailability = async (roomNumberId: string, dates: Date[]) => {
  const response = await fetch(`${API_BASE_URL}/api/my-rooms/availability/${roomNumberId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ dates }),
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to update room availability");
  }

  return response.json();
};

// Delete a room and unlink it from the hotel
export const deleteRoom = async (roomId: string, hotelId: string) => {
  const response = await fetch(`${API_BASE_URL}/api/my-rooms/${roomId}/${hotelId}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Failed to delete room");
  }

  return response.json();
};
