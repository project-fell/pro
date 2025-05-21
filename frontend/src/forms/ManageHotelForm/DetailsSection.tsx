import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";
import { RoomType } from "../../../../backend/src/shared/types";
import { fetchRooms } from "../../api-client";

const DetailsSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  const [rooms, setRooms] = useState<RoomType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadRooms = async () => {
      try {
        const data = await fetchRooms();
        setRooms(data);
      } catch (error) {
        console.error("Failed to fetch rooms:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadRooms();
  }, []);

  return (
    <div className="flex flex-col gap-4 bg-white p-6 rounded-xl shadow-md">
      <h1 className="text-3xl font-bold mb-3">Add Hotel</h1>

      {/* Name */}
      <label className="text-gray-700 text-sm font-bold flex-1">
        Name
        <input
          type="text"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("name", { required: "This field is required" })}
        />
        {errors.name && <span className="text-red-500">{errors.name.message}</span>}
      </label>

      {/* City and Country */}
      <div className="flex gap-4">
        <label className="text-gray-700 text-sm font-bold flex-1">
          City
          <input
            type="text"
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("city", { required: "This field is required" })}
          />
          {errors.city && <span className="text-red-500">{errors.city.message}</span>}
        </label>

        <label className="text-gray-700 text-sm font-bold flex-1">
          Country
          <input
            type="text"
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("country", { required: "This field is required" })}
          />
          {errors.country && <span className="text-red-500">{errors.country.message}</span>}
        </label>
      </div>

      {/* Description */}
      <label className="text-gray-700 text-sm font-bold flex-1">
        Description
        <textarea
          rows={10}
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("description", { required: "This field is required" })}
        />
        {errors.description && <span className="text-red-500">{errors.description.message}</span>}
      </label>

      {/* Room Selection */}
<label className="text-gray-700 text-sm font-bold flex-1">
  Select Available Rooms
  <div className="max-h-40 overflow-y-auto border rounded p-2 mt-1">
    {isLoading ? (
      <p>Loading rooms...</p>
    ) : rooms.length === 0 ? (
      <p>No rooms available</p>
    ) : (
      rooms.map((room) => (
        <label
          key={room._id}
          className="flex items-center space-x-2 mb-2 cursor-pointer"
        >
          <input
            type="checkbox"
            value={room._id}
            {...register("rooms", {
              validate: (value) =>
                Array.isArray(value) && value.length > 0
                  ? true
                  : "Please select at least one room",
            })}
          />
          <span className="text-gray-700">{room.title}</span>
        </label>
      ))
    )}
  </div>
  {errors.rooms && <span className="text-red-500">{errors.rooms.message}</span>}
</label>


      {/* Price and Rating */}
      <label className="text-gray-700 text-sm font-bold max-w-[50%]">
        Price Per Night
        <input
          type="number"
          min={1}
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("pricePerNight", { required: "This field is required" })}
        />
        {errors.pricePerNight && <span className="text-red-500">{errors.pricePerNight.message}</span>}
      </label>

      <label className="text-gray-700 text-sm font-bold max-w-[50%]">
        Star Rating
        <select
          {...register("starRating", { required: "This field is required" })}
          className="border rounded w-full p-2 text-gray-700 font-normal"
        >
          <option value="">Select Star Rating</option>
          {[1, 2, 3, 4, 5].map((num) => (
            <option key={num} value={num}>{num}</option>
          ))}
        </select>
        {errors.starRating && <span className="text-red-500">{errors.starRating.message}</span>}
      </label>
    </div>
  );
};

export default DetailsSection;
