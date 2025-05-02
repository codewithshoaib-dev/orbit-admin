import React from "react";

export const Input = ({ type = "text", ...props }) => (
  <input
    type={type}
    className="w-full px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
    {...props}
  />
);