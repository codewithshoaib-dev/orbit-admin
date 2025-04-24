import React from "react";

function ErrorMessage({ message }) {
  return (
    <div className="bg-red-50 border border-red-200 text-red-800 p-4 rounded-xl">
      <p className="text-sm">{message}</p>
    </div>
  );
}

export default ErrorMessage
