import React from 'react'

export default function Total({ total = "20,000 PKR" }) {
   return (
      <div className="m-2 text-left w-full text-xl font-semibold">
         Total: <span className="font-normal text-3xl">{total}</span>
      </div>
   )
}
