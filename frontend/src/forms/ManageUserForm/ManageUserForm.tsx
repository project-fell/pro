import { useForm, FormProvider } from "react-hook-form";
import UserImageSection from "./UserImageSection"; // Make sure path is correct

type Props = {
  onSave: (formData: FormData) => void;
  isLoading: boolean;
};

export type UserFormData = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  country?: string;
  img?: string;
   imageFile?: FileList;
  city?: string;
  phone?: string;
};

const ManageUserForm = ({ onSave, isLoading }: Props) => {
  const methods = useForm<UserFormData>();
  const { register, handleSubmit } = methods;

  const onSubmit = (data: UserFormData) => {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      if (key === "imageFile" && value instanceof FileList && value.length > 0) {
        formData.append("img", value[0]); // send file with field name "img"
      } else if (typeof value === "string") {
        formData.append(key, value);
      }
    }
  });

  onSave(formData);
};


  return (
    <FormProvider {...methods}>
      <div className="flex flex-col gap-4 bg-white p-6 rounded-xl shadow-md max-w-3xl mx-auto">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          {/* First Name & Last Name */}
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block mb-1 font-medium">First Name</label>
              <input
                {...register("firstName", { required: true })}
                className="w-full border border-gray-300 p-2 rounded-md"
              />
            </div>
            <div className="flex-1">
              <label className="block mb-1 font-medium">Last Name</label>
              <input
                {...register("lastName", { required: true })}
                className="w-full border border-gray-300 p-2 rounded-md"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              {...register("email", { required: true })}
              type="email"
              className="w-full border border-gray-300 p-2 rounded-md"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 font-medium">Password</label>
            <input
              {...register("password", { required: true })}
              type="password"
              className="w-full border border-gray-300 p-2 rounded-md"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block mb-1 font-medium">Phone</label>
            <input
              {...register("phone")}
              className="w-full border border-gray-300 p-2 rounded-md"
            />
          </div>

          {/* City & Country */}
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block mb-1 font-medium">City</label>
              <input
                {...register("city")}
                className="w-full border border-gray-300 p-2 rounded-md"
              />
            </div>
            <div className="flex-1">
              <label className="block mb-1 font-medium">Country</label>
              <input
                {...register("country")}
                className="w-full border border-gray-300 p-2 rounded-md"
              />
            </div>
          </div>

          {/* Image Upload Section */}
          <UserImageSection />

          {/* Submit Button Right-Aligned */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isLoading}
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Saving..." : "Save User"}
            </button>
          </div>
        </form>
      </div>
    </FormProvider>
  );
};

export default ManageUserForm; 