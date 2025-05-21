import { useFormContext } from "react-hook-form";
import { UserFormData } from "./ManageUserForm";
import { useEffect, useState } from "react";

const UserImageSection = () => {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<UserFormData>();

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const imageFile = watch("imageFile");

  useEffect(() => {
    if (imageFile && imageFile.length > 0) {
      const file = imageFile[0];
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
      setValue("img", objectUrl); // Optional: For backend or preview
    }
  }, [imageFile, setValue]);

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setValue("imageFile", undefined);
    setPreviewUrl(null);
  };

  return (
    <div className="flex flex-col gap-4 bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-3">Profile Image</h2>

      <div className="border rounded p-4 flex flex-col gap-4">
        {previewUrl && (
          <div className="relative group w-32 h-32">
            <img
              src={previewUrl}
              alt="Preview"
              className="w-full h-full object-cover rounded"
            />
            <button
              onClick={handleDelete}
              className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 text-white rounded"
            >
              Delete
            </button>
          </div>
        )}

        <input
          type="file"
          accept="image/*"
          className="w-full text-gray-700"
          {...register("imageFile", {
            validate: (fileList) =>
              !fileList || fileList.length === 0
                ? "Please upload an image"
                : true,
          })}
        />
      </div>

      {errors.imageFile && (
        <span className="text-red-500 text-sm font-bold">
          {errors.imageFile.message}
        </span>
      )}
    </div>
  );
};

export default UserImageSection;
