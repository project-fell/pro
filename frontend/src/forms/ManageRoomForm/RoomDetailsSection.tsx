import { useFormContext } from "react-hook-form";
import { RoomFormData } from "./ManageRoomForm";

interface Props {
  hotels: {
    _id: string;
    name: string;
  }[];
}

const RoomDetailsSection = ({ hotels }: Props) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<RoomFormData>();

  return (
    <div className="flex flex-col gap-4 bg-white p-6 rounded-xl">
      <h1 className="text-3xl font-bold mb-3">Add Room</h1>

      {/* Title */}
      <label className="text-gray-700 text-sm font-bold flex-1">
        Title
        <input
          type="text"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("title", { required: "This field is required" })}
        />
        {errors.title && (
          <span className="text-red-500">{errors.title.message}</span>
        )}
      </label>

      {/* Description */}
      <label className="text-gray-700 text-sm font-bold flex-1">
        Description
        <textarea
          rows={6}
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("description", { required: "This field is required" })}
        />
        {errors.description && (
          <span className="text-red-500">{errors.description.message}</span>
        )}
      </label>

      {/* Price & Max Guests */}
      <div className="flex gap-4">
        <label className="text-gray-700 text-sm font-bold flex-1">
          Price Per Night
          <input
            type="number"
            min={1}
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("price", { required: "This field is required" })}
          />
          {errors.price && (
            <span className="text-red-500">{errors.price.message}</span>
          )}
        </label>

        <label className="text-gray-700 text-sm font-bold flex-1">
          Max Guests
          <input
            type="number"
            min={1}
            className="border rounded w-full py-1 px-2 font-normal"
            {...register("maxPeople", { required: "This field is required" })}
          />
          {errors.maxPeople && (
            <span className="text-red-500">{errors.maxPeople.message}</span>
          )}
        </label>
      </div>

      {/* Room Numbers */}
      <label className="text-gray-700 text-sm font-bold flex-1">
        Room Numbers (comma-separated)
        <input
          type="text"
          placeholder="e.g. 101,102,103"
          className="border rounded w-full py-1 px-2 font-normal"
          {...register("roomNumbers", {
            required: "This field is required",
            validate: (value) => {
              const isValid = value
                .split(",")
                .every((num) => !isNaN(Number(num.trim())));
              return isValid || "Please enter only numbers separated by commas";
            },
          })}
        />
        {errors.roomNumbers && (
          <span className="text-red-500">{errors.roomNumbers.message}</span>
        )}
      </label>

      {/* Hotel Selection */}
      <label className="text-gray-700 text-sm font-bold flex-1">
        Hotel
        <select
          className="border rounded w-full p-2 text-gray-700 font-normal"
          {...register("hotelId", { required: "This field is required" })}
        >
          <option value="">Select a hotel</option>
          {hotels.map((hotel) => (
            <option key={hotel._id} value={hotel._id}>
              {hotel.name}
            </option>
          ))}
        </select>
        {errors.hotelId && (
          <span className="text-red-500">{errors.hotelId.message}</span>
        )}
      </label>
    </div>
  );
};

export default RoomDetailsSection;
