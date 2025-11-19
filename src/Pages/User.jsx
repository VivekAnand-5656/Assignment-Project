import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const UserDetail = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("users")) || [];
    const u = stored.find((u) => u.id === parseInt(id));
    setUser(u);
  }, [id]);

  if (!user)
    return (
      <p className="p-6 text-center text-red-500 font-semibold">
        User not found
      </p>
    );

  return (
    <div className="w-full min-h-screen p-4 bg-[#F3F4F6] flex justify-center items-start sm:items-center pt-10 sm:pt-0">
      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl max-w-md w-full
                      transform hover:scale-105 transition-transform duration-300">
        <h2 className="text-2xl sm:text-3xl font-bold text-blue-700 mb-6 text-center">
          User Details
        </h2>

        <div className="space-y-3 text-gray-700 text-sm sm:text-base">
          <p><span className="font-semibold">ID:</span> {user.id}</p>
          <p><span className="font-semibold">Name:</span> {user.name}</p>
          <p><span className="font-semibold">Email:</span> {user.email}</p>
          <p><span className="font-semibold">Phone:</span> {user.phone}</p>
          <p><span className="font-semibold">Website:</span> {user.website || "-"}</p>
          <p><span className="font-semibold">City:</span> {user.address?.city || "-"}</p>
          <p><span className="font-semibold">Zipcode:</span> {user.address?.zipcode || "-"}</p>
        </div>

        <Link
          to="/"
          className="mt-6 block text-center bg-blue-600 text-white px-5 py-2 rounded-full
                     hover:bg-blue-700 shadow-md hover:shadow-lg transition-all duration-300"
        >
          Back
        </Link>
      </div>
    </div>
  );
};

export default UserDetail;
