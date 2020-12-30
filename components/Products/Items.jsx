import React from 'react'

import Card from './Card'

export default function Items({ items, className }) {
   return (
      <div className={`${className} flex flex-row flex-wrap justify-center`}>
         {items.map(item => ( 
            <Card key={item.id} item={item} />
         ))}
      </div>
   )
}
