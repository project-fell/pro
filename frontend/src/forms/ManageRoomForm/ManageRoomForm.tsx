import { useForm, FormProvider } from "react-hook-form";
import RoomDetailsSection from "./RoomDetailsSection";
import { useEffect } from "react";
import { RoomType } from "../../../../backend/src/shared/types";

export interface RoomFormData {
  title: string;
  description: string;
  price: number;
  maxPeople: number;
  roomNumbers: string;
  hotelId: string; // Hotel reference
}

interface Hotel {
  _id: string;
  name: string;
}

interface Room {
  _id: string;
  title: string;
  description: string;
  price: number;
  maxPeople: number;
  roomNumbers: { number: number; unavailableDates: Date[] }[];
  hotelId: string;
}

interface Props {
  room?: Room;
  onSave: (roomData: Partial<RoomType>) => void;
  isLoading: boolean;
  hotels: Hotel[];
}

const ManageRoomForm = ({ room, onSave, isLoading, hotels }: Props) => {
  const formMethods = useForm<RoomFormData>({
    defaultValues: {
      title: "",
      description: "",
      price: 0,
      maxPeople: 1,
      roomNumbers: "",
      hotelId: "",
    },
  });

  const { handleSubmit, reset } = formMethods;

  useEffect(() => {
    if (room) {
      reset({
        title: room.title,
        description: room.description,
        price: room.price,
        maxPeople: room.maxPeople,
        roomNumbers: room.roomNumbers.map((r) => r.number).join(","),
        hotelId: room.hotelId,
      });
    }
  }, [room, reset]);

  const onSubmit = handleSubmit((data) => {
    const parsedRoomNumbers = data.roomNumbers
      .split(",")
      .map((num) => ({
        number: parseInt(num.trim(), 10),
        unavailableDates: [],
      }))
      .filter((room) => !isNaN(room.number));

    const roomData: Partial<RoomType> = {
      title: data.title,
      desc: data.description, // assuming RoomType uses `desc`
      price: data.price,
      maxPeople: data.maxPeople,
      roomNumbers: parsedRoomNumbers,
      hotelId: data.hotelId, // if RoomType has `hotel` reference
      ...(room?._id && { _id: room._id }),
    };

    onSave(roomData);
  });

  return (
    <FormProvider {...formMethods}>
      <form
        onSubmit={onSubmit}
        className="flex flex-col gap-4 bg-white p-6 rounded-xl shadow-md"
      >
        <RoomDetailsSection hotels={hotels} />
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className={`bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? "Saving..." : "Save Room"}
          </button>
        </div>
      </form>
    </FormProvider>
  );
};

export default ManageRoomForm;
