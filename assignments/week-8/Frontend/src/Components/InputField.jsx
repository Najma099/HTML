import React from "react";

export default function InputField({ name, type, placeholder,autoComplete }) {
  return (
    <div className="mb-4">
      <input
        type={type}
        autoComplete={autoComplete}
        name={name}
        placeholder={placeholder}
        className="border-2 bg-gray-100 border-gray-300 rounded-md p-2 w-full text-gray-800"
      />
    </div>
  );
}
