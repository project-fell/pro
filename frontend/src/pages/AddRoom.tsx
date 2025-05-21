import { useQuery, useMutation } from "react-query";
import ManageRoomForm from "../forms/ManageRoomForm/ManageRoomForm";
import { useAppContext } from "../contexts/AppContext";
import * as apiClient from "../api-client";
import { RoomType } from "../../../backend/src/shared/types";

const AddRoom = () => {
  const { showToast } = useAppContext();

  // ✅ Fetch hotels
  const { data: hotels, isLoading: isHotelsLoading } = useQuery(
    "hotels",
    apiClient.fetchHotels
  );

  // ✅ Mutation that sends plain RoomType-compatible object
  const { mutate, isLoading: isSaving } = useMutation(
    (roomData: Partial<RoomType>) => apiClient.addRoom(roomData),
    {
      onSuccess: () => {
        showToast({ message: "Room Saved!", type: "SUCCESS" });
      },
      onError: () => {
        showToast({ message: "Error Saving Room", type: "ERROR" });
      },
    }
  );

  // ✅ No FormData here — just plain object
  const handleSave = (roomData: Partial<RoomType>) => {
    mutate(roomData);
  };

  if (isHotelsLoading || !hotels) return <div>Loading hotels...</div>;

  return (
    <ManageRoomForm
      onSave={handleSave}
      isLoading={isSaving}
      hotels={hotels}
    />
  );
};

export default AddRoom;
