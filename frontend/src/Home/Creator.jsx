import axios from "axios";
import React, { useEffect, useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import toast from "react-hot-toast";

function Creator() {
  const [admin, setAdmin] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/users/admins`,
          {
            withCredentials: true,
          }
        );
        setAdmin(Array.isArray(data.admins) ? data.admins : []);
      } catch (error) {
        console.error("Error fetching admins:", error);
        toast.error("Failed to fetch club coordinators");
        setAdmin([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAdmins();
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-6">Club Coordinators</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 rounded-full my-5">
        {admin && admin.length > 0 ? (
          admin.slice(0, 4).map((element) => (
            <div key={element._id}>
              <div className="">
                <img
                  src={element.photo?.url}
                  alt="blog"
                  className="md:w-56 md:h-56 object-cover border border-black rounded-full items-center"
                />
                <div className="text-center md:ml-[-130px]">
                  <p>{element.name}</p>
                  <p className="text-gray-600 text-xs">{element.club}</p>
                  <p className="text-gray-600 text-xs">{element.phone}</p>
                  <p className="text-gray-600 text-xs">{element.email}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500">
            No club coordinators available
          </div>
        )}
      </div>
    </div>
  );
}

export default Creator;
