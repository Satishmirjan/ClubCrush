import React from 'react';
import { IoWarningOutline } from 'react-icons/io5';

const ErrorMessage = ({ message }) => {
  return (
    <div className="flex items-center justify-center min-h-[200px]">
      <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md shadow-sm">
        <div className="flex items-center">
          <IoWarningOutline className="text-red-500 text-xl mr-2" />
          <p className="text-red-700">{message || 'Something went wrong. Please try again.'}</p>
        </div>
      </div>
    </div>
  );
};

export default ErrorMessage; 