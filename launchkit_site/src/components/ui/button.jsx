import React from "react";

export const Button = ({ children, asChild, className = "", ...props }) => {
  // If asChild is true, do not pass the button as an actual DOM element
  const Component = asChild ? "span" : "button"; // Use a span if asChild is true

  return (
    <Component
      className={`px-5 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition disabled:opacity-50 ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
};
