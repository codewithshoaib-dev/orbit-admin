import React from "react";

const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="flex flex-col items-center justify-center bg-red-100 text-red-700 p-4 rounded-lg shadow-md">
      <p className="text-lg font-semibold mb-2">Oops! Something went wrong.</p>
      <p className="text-sm mb-4">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
        >
          Retry
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;