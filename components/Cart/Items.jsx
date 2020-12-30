import React from 'react'
import Card from './Card';

export default function Items({ items, onDelete }) {
   return (
      <>
         {items.map(item => (
            <Card 
               key={item.product_id} 
               item={item} 
               onDelete={onDelete}
            />
         ))}
      </>
   )
}
