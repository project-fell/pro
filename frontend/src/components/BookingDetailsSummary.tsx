import { HotelType } from "../../../backend/src/shared/types";

type SelectedRoom = {
  roomId: string;
  roomNumber: string;
  price: number;
  title: string;
};

type Props = {
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
  numberOfNights: number;
  hotel: HotelType;
  selectedRooms?: SelectedRoom[];
  totalPrice?: number;
};

const BookingDetailsSummary = ({
  checkIn,
  checkOut,
  adultCount,
  childCount,
  numberOfNights,
  hotel,
  selectedRooms,
  totalPrice,
}: Props) => {
  return (
    <div className="grid gap-4 rounded-lg border border-slate-300 p-5 h-fit">
      <h2 className="text-xl font-bold">Your Booking Details</h2>
      <div className="border-b py-2">
        Location:
        <div className="font-bold">{`${hotel.name}, ${hotel.city}, ${hotel.country}`}</div>
      </div>

      {selectedRooms && selectedRooms.length > 0 && (
        <div className="border-b py-2">
          <h3 className="font-semibold mb-2">Selected Rooms:</h3>
          {selectedRooms.map((room) => (
            <div key={room.roomId} className="mb-2 pl-2">
              <div className="font-medium">{room.title}</div>
              <div className="text-sm">Room {room.roomNumber}</div>
              <div className="text-sm">${room.price} per night</div>
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-between">
        <div>
          Check-in
          <div className="font-bold"> {checkIn.toDateString()}</div>
        </div>
        <div>
          Check-out
          <div className="font-bold"> {checkOut.toDateString()}</div>
        </div>
      </div>

      <div className="border-t border-b py-2">
        Total length of stay:
        <div className="font-bold">{numberOfNights} nights</div>
      </div>

      <div className="border-b py-2">
        Guests:
        <div className="font-bold">
          {adultCount} adults & {childCount} children
        </div>
      </div>

      {totalPrice && (
        <div className="border-t pt-2">
          <div className="text-xl font-bold">
            Total Price: ${totalPrice.toFixed(2)}
          </div>
          <div className="text-xs text-gray-500">
            Includes taxes and charges
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingDetailsSummary;