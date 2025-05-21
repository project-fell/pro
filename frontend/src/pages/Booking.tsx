import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import BookingForm from "../forms/BookingForm/BookingForm";
import { useSearchContext } from "../contexts/SearchContext";
import { useParams, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import BookingDetailsSummary from "../components/BookingDetailsSummary";
import { Elements } from "@stripe/react-stripe-js";
import { useAppContext } from "../contexts/AppContext";

type ReservationData = {
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

const Booking = () => {
  const { stripePromise } = useAppContext();
  const search = useSearchContext();
  const { hotelId } = useParams();
  const { state } = useLocation();
  const reservationData = state?.reservationData as ReservationData | undefined;

  // Use reservation data if available, otherwise fall back to search context
  const checkIn = reservationData?.checkIn || search.checkIn;
  const checkOut = reservationData?.checkOut || search.checkOut;
  const adultCount = reservationData?.adultCount || search.adultCount;
  const childCount = reservationData?.childCount || search.childCount;

  const [numberOfNights, setNumberOfNights] = useState<number>(0);

  useEffect(() => {
    if (checkIn && checkOut) {
      const nights =
        Math.abs(checkOut.getTime() - checkIn.getTime()) /
        (1000 * 60 * 60 * 24);
      setNumberOfNights(Math.ceil(nights));
    }
  }, [checkIn, checkOut]);

  const { data: paymentIntentData } = useQuery(
  "createPaymentIntent",
  () => {
    if (!reservationData) {
      throw new Error("Reservation data is required");
    }
    return apiClient.createPaymentIntent(
      hotelId as string,
      numberOfNights.toString(),
      reservationData // Pass the full object
    );
  },
  {
    enabled: !!hotelId && numberOfNights > 0 && !!reservationData,
  }
);

  const { data: hotel } = useQuery(
    "fetchHotelByID",
    () => apiClient.fetchHotelById(hotelId as string),
    {
      enabled: !!hotelId,
    }
  );

  const { data: currentUser } = useQuery(
    "fetchCurrentUser",
    apiClient.fetchCurrentUser
  );

  if (!hotel) {
    return <></>;
  }

  return (
    <div className="grid md:grid-cols-[1fr_2fr] gap-4 p-4">
      <BookingDetailsSummary
        checkIn={checkIn}
        checkOut={checkOut}
        adultCount={adultCount}
        childCount={childCount}
        numberOfNights={numberOfNights}
        hotel={hotel}
        selectedRooms={reservationData?.selectedRooms}
        totalPrice={reservationData?.totalPrice}
      />
      {currentUser && paymentIntentData && reservationData && (
        <Elements
          stripe={stripePromise}
          options={{
            clientSecret: paymentIntentData.clientSecret,
          }}
        >
          <BookingForm
            currentUser={currentUser}
            paymentIntent={paymentIntentData}
            reservationData={reservationData} 
            rooms={[]}          />
        </Elements>
      )}
    </div>
  );
};

export default Booking;