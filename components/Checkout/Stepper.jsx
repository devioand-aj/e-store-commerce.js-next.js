import React, { useEffect, useState } from 'react';
import { IoIosArrowForward } from 'react-icons/io';

const defaultStepperItems = [
   { label: 'Address', value: 1 },
   { label: 'Payment', value: 2 }
]

export default function Stepper({ value = 1, items = defaultStepperItems }) {
   const [length, setLength] = useState(0);

   useEffect(() => {
      if (items) setLength(items.length)
   }, [items])

   return (
      <div className="flex items-center -mt-2 mb-3 text-sm text-gray-700">
         {items.map(item => (
            <div key={item.label} className="flex items-center">
               <div className={`${item.value === value && "text-black font-semibold"}`}>{item.label}</div>
               {item.value !== length && <div className="mx-2"><IoIosArrowForward /></div>}
            </div>
         ))}
      </div>
   )
}
