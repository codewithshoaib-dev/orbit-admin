import React from "react";

export const Button = ({ children, asChild, className = "", ...props }) => {
 
  const Component = asChild ? "span" : "button"; 

  return (
    <Component
      className={`px-5 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition disabled:opacity-50 ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
};
