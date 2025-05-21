import { useMutation } from "react-query";
import ManageUserForm from "../forms/ManageUserForm/ManageUserForm";
import { useAppContext } from "../contexts/AppContext";
import * as apiClient from "../api-client";

const AddUser = () => {
  const { showToast } = useAppContext();

  const { mutate, isLoading } = useMutation(apiClient.addUser, {
    onSuccess: () => {
      showToast({ message: "User Saved!", type: "SUCCESS" });
    },
    onError: () => {
      showToast({ message: "Error Saving User", type: "ERROR" });
    },
  });

  const handleSave = (userFormData: FormData) => {
    mutate(userFormData);
  };

  return <ManageUserForm onSave={handleSave} isLoading={isLoading} />;
};

export default AddUser;
