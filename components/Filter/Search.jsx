import React, { useEffect, useState } from 'react'
import { BiSearch } from 'react-icons/bi'

export default function Search({ value, onChange }) {
   const [isFocused, setIsFocused] = useState(false);

   const getOnFocused = (onTrue, onFalse) => {
      if (isFocused) return onTrue
      
      return onFalse;
   }


   return (
      <div className="flex bg-secondary">
         <div className={`flex items-center ml-2 ${getOnFocused("text-black", "text-gray-400")} `}><BiSearch /></div>
         <input 
            className="p-2 focus:outline-none bg-secondary" 
            type="text" 
            placeholder="Search..."  
            onFocus={() => setIsFocused(true)} 
            onBlur={() => setIsFocused(false)}
            onChange={onChange}
            value={value}
         />
      </div>
   )
}
