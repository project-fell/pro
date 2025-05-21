// EditRoom.tsx
import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "../api-client";
import ManageRoomForm from "../forms/ManageRoomForm/ManageRoomForm";
import { useAppContext } from "../contexts/AppContext";
import { RoomType } from "../../../backend/src/shared/types";


const EditRoom = () => {
  const { roomId } = useParams();
  const { showToast } = useAppContext();

  const { data: room } = useQuery(
    "fetchRoomById",
    () => apiClient.fetchRoomById(roomId || ""),
    {
      enabled: !!roomId,
    }
  );

  const { mutate, isLoading } = useMutation(
  ({ roomId, roomData }: { roomId: string; roomData: Partial<RoomType> }) =>
    apiClient.updateRoom(roomId, roomData),
  {
    onSuccess: () => showToast({ message: "Room updated!", type: "SUCCESS" }),
    onError: () => showToast({ message: "Error updating room", type: "ERROR" }),
  }
);

const handleSave = (roomData: Partial<RoomType>) => {
  if (!roomId) return;
  mutate({ roomId, roomData });
};



  return (
    <ManageRoomForm room={room} onSave={handleSave} isLoading={isLoading} hotels={[]} />
  );
};

export default EditRoom;
