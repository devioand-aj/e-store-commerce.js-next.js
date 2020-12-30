import React from 'react'

export default function CartWrapper({ children }) {
   return (
      <div className=" flex justify-center my-8 container "> 
         <div className="px-2 border-green-600 w-full md:w-50r">
            {children}
         </div>
      </div>
   )
}
