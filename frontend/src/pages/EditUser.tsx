import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "../api-client";
import ManageUserForm from "../forms/ManageUserForm/ManageUserForm";
import { useAppContext } from "../contexts/AppContext";

const EditUser = () => {
  const { userId } = useParams();
  const { showToast } = useAppContext();

  const { data: user, isLoading: isFetching } = useQuery(
    ["fetchUserById", userId],
    () => apiClient.fetchUserById(userId || ""),
    {
      enabled: !!userId,
      onError: () => {
        showToast({ message: "Error fetching user data", type: "ERROR" });
      }
    }
  );

  const { mutate, isLoading: isSaving } = useMutation(
    (formData: FormData) => apiClient.updateUserById(userId || "", formData),
    {
      onSuccess: () => {
        showToast({ message: "User saved successfully!", type: "SUCCESS" });
      },
      onError: (error: Error) => {
        showToast({ message: error.message, type: "ERROR" });
      },
    }
  );

  return (
    <ManageUserForm 
      user={user} 
      onSave={mutate} 
      isLoading={isSaving} 
      isFetching={isFetching}
    />
  );
};

export default EditUser;