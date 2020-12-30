import React from 'react'

export default function Scroll({  children }) {
   return (
      <div className="overflow-x-scroll whitespace-nowrap scrollbar-hidden">
         <div className="w-max mx-auto md:pr-10 pr-5">
            {children}
         </div>
      </div>
   )
}
