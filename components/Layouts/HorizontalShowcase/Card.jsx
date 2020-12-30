import React from 'react'
import Link from 'next/link';

export default function Card({ item: { permalink, name, price, media: { source: img }} }) {
   return (
      <Wrapper permalink={permalink}>
         <CardStructure img={img} />
         <CardDescription name={name} price={price} />
      </Wrapper>    
   )
}

function Wrapper({ permalink, children }) {
   return (
      <Link href={`/products/${permalink}`}>
         <div className="w-48 h-64 md:w-64 md:h-80 active-shrink relative m-2 inline-block bg-pink-100">
            {children}
         </div>
      </Link>
   )
}

function CardStructure({ img }) {
   return (
      <>
         <img className="w-full h-full object-cover bg-center" src={img}/>
         <div className="bg-gray-800 w-full h-full opacity-40 absolute top-0 left-0"></div>
      </>
   )
}

function CardDescription({ name, price }) {
   return (
      <div className="px-2 cursor-pointer select-none absolute bottom-4 bg-primary w-11/12 left-1/2 transform -translate-x-1/2">
         <h3 className="overflow-hidden overflow-ellipsis whitespace-nowrap text-white text-center md:text-xl md:my-2 my-1">{name}</h3>
         {price && <h2 className="text-white text-center text-sm font-semibold md:text-xl md:my-2 my-1">{price.formatted_with_code}</h2>}
      </div>
   )
}
