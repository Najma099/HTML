import React from "react";
export default function InputFeild({ label,name, value, type, placeholder, onChange}) {
  return(
    <div>
      <label>{ label}</label>
      <input 
        type={type}
        name={ name}
        placeholder={ placeholder}
        value={value}
        onChange={onChange}
        className="border-2 bg-gray-100 border-gray-200 rounded-md p-2 w-100 text-grey-400 mb-3"
      />
    </div>
  )
}