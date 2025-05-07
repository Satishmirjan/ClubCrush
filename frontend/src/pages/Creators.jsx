import axios from "axios";
import React, { useEffect, useState } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import toast from "react-hot-toast";

function Creators() {
  const [creators, setCreators] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCreators = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/users/admins`,
          {
            withCredentials: true,
          }
        );
        setCreators(Array.isArray(data.admins) ? data.admins : []);
      } catch (error) {
        console.error("Error fetching creators:", error);
        toast.error("Failed to fetch creators");
        setCreators([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCreators();
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Club Coordinators</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {creators && creators.length > 0 ? (
          creators.map((creator) => (
            <div
              key={creator._id}
              className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
            >
              <div className="relative">
                <img
                  src={creator.photo?.url}
                  alt={creator.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 transform translate-y-1/2">
                  <img
                    src={creator.photo?.url}
                    alt={creator.name}
                    className="w-20 h-20 rounded-full mx-auto border-4 border-white shadow-lg"
                  />
                </div>
              </div>
              <div className="px-6 py-8 mt-8">
                <h2 className="text-xl font-semibold text-center text-gray-800 mb-2">
                  {creator.name}
                </h2>
                <p className="text-center text-blue-600 font-medium mb-2">
                  {creator.club}
                </p>
                <div className="space-y-2 text-center text-gray-600">
                  <p className="flex items-center justify-center">
                    <span className="mr-2">📧</span>
                    {creator.email}
                  </p>
                  <p className="flex items-center justify-center">
                    <span className="mr-2">📱</span>
                    {creator.phone}
                  </p>
                  <p className="flex items-center justify-center">
                    <span className="mr-2">👤</span>
                    {creator.role}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500 py-8">
            No club coordinators available
          </div>
        )}
      </div>
    </div>
  );
}

export default Creators;
