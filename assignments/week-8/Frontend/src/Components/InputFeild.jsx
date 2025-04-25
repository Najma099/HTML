export default function InputFeild({ label, type, placeholder}) {
  return(
    <div>
      <label>{ label}</label>
      <input 
        type={type}
        placeholder={placeholder}
        className="w-full p-3"
      ></input>
    </div>
  )
}