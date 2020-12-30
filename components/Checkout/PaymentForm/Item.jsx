import React from 'react'
import Link from 'next/link';

export default function Item({ item: { 
      name, 
      quantity, 
      price: { formatted_with_code: itemPrice },
      line_total: { formatted_with_code: totalPrice },
      permalink
   } }) {
   return (
      <div className="border-b py-2 flex flex-col w-full px-3 my-1">
         <Link href={`/products/${permalink}`} passHref><a className="text-lg font-medium cursor-pointer select-none underline">{name}</a></Link>
         <div className=" my-1 font-semibold text-base text-gray-700">
           <span>{quantity}</span> <span className="text-xs">&#10005;</span> <span>{itemPrice}</span>
         </div>
         <div className="">
            Subtotal: <span className="font-semibold">{totalPrice}</span>
         </div>
      </div>
   )
}
