import React from "react";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";

function DSC() {
  const { blogs, isLoading } = useAuth();
  const dscBlogs = Array.isArray(blogs) ? blogs.filter((blog) => blog.category === "DSC") : [];

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">DSC</h1>
      <p className="text-center mb-8">
        Developer Student Clubs
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dscBlogs && dscBlogs.length > 0 ? (
          dscBlogs.map((blog) => (
            <div key={blog._id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src={blog.blogImage?.url}
                alt={blog.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
                <p className="text-gray-600 mb-4">{blog.about}</p>
                <div className="flex justify-between items-center">
                  <p className="text-sm">DSC</p>
                  <Link
                    to={`/blog/${blog._id}`}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500">
            No DSC blogs available
          </div>
        )}
      </div>
    </div>
  );
}

export default DSC;
