import React, { forwardRef } from 'react'
import { useForm } from "react-hook-form";

const InputField = forwardRef(({ type="text", errors, name, value, label, ...otherProps }, ref) => {
   const { watch } = useForm();

   return (
      <div className="w-full flex flex-col items-center my-2">
         <div className="w-full">
            {/* <div className="text-sm font-medium m-1">{label}</div> */}
            <input 
               ref={ref}
               name={name}
               value={watch(name)}
               className={`${errors[name] && "outline-solid-red"} focus:outline-solid-gray w-full p-3 bg-gray-200`} 
               type={type} 
               {...otherProps}
            />
            {errors[name] && <div className="text-primary">{errors[name].message}</div>}
         </div>
      </div>
   )
})

export default InputField;

