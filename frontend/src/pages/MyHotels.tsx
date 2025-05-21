import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import * as apiClient from "../api-client";
import { RoomType, UserType } from "../../../backend/src/shared/types";

const MyHotels = () => {
  const { data: hotelData } = useQuery("fetchMyHotels", apiClient.fetchMyHotels);
  const { data: userData } = useQuery<UserType[]>("fetchUsers", apiClient.fetchUsers);
  const { data: roomData } = useQuery<RoomType[]>("fetchRooms", apiClient.fetchRooms);

  return (
    <div className="datatable p-5 space-y-12">
      {/* Hotels Section */}
      <div>
        <div className="datatableTitle flex justify-between items-center mb-4 text-gray-700 text-2xl">
          My Hotels
          <Link
            to="/add-hotel"
            className="link text-blue-600 text-base font-normal border border-blue-600 px-2 py-1 rounded cursor-pointer hover:bg-blue-50"
          >
            Add New
          </Link>
        </div>

        {!hotelData ? (
          <span>No Hotels found</span>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-300 text-left">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2 border">ID</th>
                  <th className="p-2 border">Name</th>
                  <th className="p-2 border">Type</th>
                  <th className="p-2 border">Facilities</th>
                  <th className="p-2 border">City</th>
                  <th className="p-2 border">Country</th>
                  <th className="p-2 border">Description</th>
                  <th className="p-2 border">Price Per Night</th>
                  <th className="p-2 border">Star Rating</th>
                  <th className="p-2 border">Action</th>
                </tr>
              </thead>
              <tbody>
                {hotelData.map((hotel) => (
                  <tr key={hotel._id} className="hover:bg-gray-50">
                    <td className="p-2 border">{hotel._id}</td>
                    <td className="p-2 border">{hotel.name}</td>
                    <td className="p-2 border">{hotel.type}</td>
                    <td className="p-2 border truncate max-w-xs">{hotel.facilities?.join(", ")}</td>
                    <td className="p-2 border">{hotel.city}</td>
                    <td className="p-2 border">{hotel.country}</td>
                    <td className="p-2 border truncate max-w-xs">{hotel.description}</td>
                    <td className="p-2 border">{hotel.pricePerNight}</td>
                    <td className="p-2 border">{hotel.starRating}</td>
                    <td className="p-2 border">
                      <div className="cellAction flex items-center gap-4">
                        <Link
                          to={`/edit-hotel/${hotel._id}`}
                          className="viewButton px-2 py-1 rounded border border-blue-800 text-blue-800 hover:bg-blue-50"
                        >
                          View
                        </Link>
                        <button
                          className="deleteButton px-2 py-1 rounded border border-red-500 text-red-500 hover:bg-red-50"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Users Section */}
      <div>
        <div className="datatableTitle flex justify-between items-center mb-4 text-gray-700 text-2xl">
          Users
          <Link
            to="/add-user"
            className="link text-blue-600 text-base font-normal border border-blue-600 px-2 py-1 rounded cursor-pointer hover:bg-blue-50"
          >
            Add New
          </Link>
        </div>

        {!userData ? (
          <span>No Users found</span>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-300 text-left">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2 border">ID</th>
                  <th className="p-2 border">Username</th>
                  <th className="p-2 border">Email</th>
                  <th className="p-2 border">Action</th>
                </tr>
              </thead>
              <tbody>
                {userData.map((user) => (
                  <tr key={user._id} className="hover:bg-gray-50">
                    <td className="p-2 border">{user._id}</td>
                    <td className="p-2 border">{user.firstName}</td>
                    <td className="p-2 border">{user.email}</td>
                    <td className="p-2 border">
                      <div className="cellAction flex items-center gap-4">
                        <Link
                          to={`/edit-user/${user._id}`}
                          className="viewButton px-2 py-1 rounded border border-blue-800 text-blue-800 hover:bg-blue-50"
                        >
                          View
                        </Link>
                        <button
                          className="deleteButton px-2 py-1 rounded border border-red-500 text-red-500 hover:bg-red-50"
                        >
                          Delete
                        </button>
                      </div>
                      
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <div>
  <div className="datatableTitle flex justify-between items-center mb-4 text-gray-700 text-2xl">
    Rooms
    <Link
      to="/add-room"
      className="link text-blue-600 text-base font-normal border border-blue-600 px-2 py-1 rounded cursor-pointer hover:bg-blue-50"
    >
      Add New
    </Link>
  </div>

  {!roomData ? (
    <span>No Rooms found</span>
  ) : (
    <div className="overflow-x-auto">
      <table className="w-full border border-gray-300 text-left">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Title</th>
            <th className="p-2 border">Description</th>
            <th className="p-2 border">Price</th>
            <th className="p-2 border">Max People</th>
            <th className="p-2 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {roomData.map((room ) => (
            <tr key={room._id} className="hover:bg-gray-50">
              <td className="p-2 border">{room._id}</td>
              <td className="p-2 border">{room.title}</td>
              <td className="p-2 border truncate max-w-xs">{room.desc}</td>
              <td className="p-2 border">{room.price}</td>
              <td className="p-2 border">{room.maxPeople}</td>
              <td className="p-2 border">
                <div className="cellAction flex items-center gap-4">
                  <Link
                    to={`/edit-room/${room._id}`}
                    className="viewButton px-2 py-1 rounded border border-blue-800 text-blue-800 hover:bg-blue-50"
                  >
                    View
                  </Link>
                  <button
                    className="deleteButton px-2 py-1 rounded border border-red-500 text-red-500 hover:bg-red-50"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}
</div>
    </div>
  );
};

export default MyHotels;
