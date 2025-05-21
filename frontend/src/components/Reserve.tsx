import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ReservationData, RoomType } from "../../../backend/src/shared/types";

type Props = {
  hotelId: string;
  checkIn: Date;
  checkOut: Date;
  onClose: () => void;
  adultCount: number;
  childCount: number;
};

const Reserve = ({ hotelId, checkIn, checkOut, onClose, adultCount, childCount }: Props) => {
  const [rooms, setRooms] = useState<RoomType[]>([]);
  const [selectedRooms, setSelectedRooms] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
  console.log("Fetching rooms for hotel:", hotelId); // 👈 debug log
  const fetchRooms = async () => {
  try {
    // First validate the hotel ID format
    if (!/^[0-9a-fA-F]{24}$/.test(hotelId)) {
      throw new Error("Invalid hotel ID format");
    }

    // Verify hotel exists first
    const hotelResponse = await axios.get(`/api/hotels/${hotelId}`);
    
    if (!hotelResponse.data) {
      throw new Error("Hotel not found");
    }

    // Then fetch rooms
    const roomsResponse = await axios.get(`/api/hotels/${hotelId}/rooms`);
    setRooms(roomsResponse.data);
    
  } catch (err) {
    if (axios.isAxiosError(err)) {
      const errorMessage = err.response?.data?.message || 
                         `HTTP ${err.response?.status}: ${err.message}`;
      setError(`Failed to load data: ${errorMessage}`);
    } else if (err instanceof Error) {
      setError(err.message);
    } else {
      setError("An unknown error occurred");
    }
    console.error("Fetch error:", err);
  }
};
  fetchRooms();
}, [hotelId]);

  const getDatesInRange = (startDate: Date, endDate: Date) => {
    const dates: number[] = [];
    const current = new Date(startDate);
    while (current <= endDate) {
      dates.push(current.getTime());
      current.setDate(current.getDate() + 1);
    }
    return dates;
  };

  const alldates = getDatesInRange(checkIn, checkOut);

  const isAvailable = (unavailableDates: Date[]) => {
    return !unavailableDates.some(date =>
      alldates.includes(new Date(date).getTime())
    );
  };

  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const roomId = e.target.value;
    setSelectedRooms(prev =>
      e.target.checked ? [...prev, roomId] : prev.filter(id => id !== roomId)
    );
  };

  const handleReserve = async () => {
    if (selectedRooms.length === 0) {
      setError("Please select at least one available room.");
      return;
    }

    const selectedRoomDetails = rooms.flatMap(room =>
      room.roomNumbers
        .filter(rn => selectedRooms.includes(`${room._id}-${rn.number}`))
        .map(rn => ({
          roomId: room._id,
          roomNumber: rn.number.toString(),
          price: room.price,
          title: room.title,
        }))
    );

    const totalPrice = selectedRoomDetails.reduce(
      (total, room) => total + room.price * alldates.length,
      0
    );

    const reservationData: ReservationData = {
      hotelId,
      roomIds: selectedRooms.map(id => id.split("-")[0]), // Extract roomId
      dates: alldates,
      totalPrice,
      checkIn,
      checkOut,
      adultCount,
      childCount,
      selectedRooms: selectedRoomDetails,
    };

    navigate(`/hotel/${hotelId}/booking`, {
      state: { reservationData },
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Set your rooms:</h2>

        {rooms.map(room => {
          const availableRoomNumbers = room.roomNumbers.filter(rn => isAvailable(rn.unavailableDates));
          if (availableRoomNumbers.length === 0) return null;

          return (
            <div key={room._id} className="mb-6 p-4 border rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold">{room.title}</h3>
                <span className="font-bold">${room.price}</span>
              </div>

              <p className="text-gray-600 mb-2">{room.desc}</p>
              <p className="text-sm text-gray-500 mb-3">Max people: {room.maxPeople}</p>

              <div className="space-y-2">
                {availableRoomNumbers.map(rn => {
                  const uniqueId = `${room._id}-${rn.number}`;
                  return (
                    <div key={uniqueId} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`room-${uniqueId}`}
                        value={uniqueId}
                        onChange={handleSelect}
                        className="mr-2"
                      />
                      <label htmlFor={`room-${uniqueId}`} className="text-sm">
                        Room {rn.number}
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

        <div className="flex justify-end space-x-3 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            onClick={handleReserve}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Reserve Now!
          </button>
        </div>
      </div>
    </div>
  );
};

export default Reserve;
