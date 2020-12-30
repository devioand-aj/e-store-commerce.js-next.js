import React from 'react';
import Link from 'next/link';

export default function RoundedCard({ item }) {
   const { name, img, slug } = item;

   return (
      <Link href={`/${slug}`}>
         <div className="inline-block mx-1 md:mx-4 active-shrink">
            <div className="flex justify-center">
               <div className="flex justify-center  w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden">
                  <img className="w-full h-full object-cover" src={img} alt="headphone"/>
               </div>
            </div>
            <div className="mt-2 md:mt-4 text-center text-xl md:text-2xl font-medium">{name}</div>
         </div>
      </Link>
)
}
