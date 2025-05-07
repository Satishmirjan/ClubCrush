import React from "react";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";

function IEEE() {
  const { blogs, isLoading } = useAuth();
  const ieeeBlogs = Array.isArray(blogs) ? blogs.filter((blog) => blog.category === "IEEE") : [];

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <div className="container mx-auto my-12 p-4">
        <h1 className="text-2xl font-bold mb-6">IEEE</h1>
        <p className="text-center mb-8">
          Institute of Electrical and Electronics Engineers
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {ieeeBlogs && ieeeBlogs.length > 0 ? (
            ieeeBlogs.map((blog, index) => (
              <Link
                to={`/blog/${blog._id}`}
                key={index}
                className="relative rounded-lg overflow-hidden shadow-md transform hover:scale-105 transition-transform duration-300"
              >
                <img
                  src={blog?.blogImage?.url}
                  alt={blog?.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-black opacity-30"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h2 className="text-lg font-semibold">{blog?.title}</h2>
                  <p className="text-sm">IEEE</p>
                </div>
              </Link>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500">
              No IEEE blogs available
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default IEEE;
