import React from 'react'
import Item from './Item'

export default function Items({ items }) {
   return (
      <>
         {items.map(item => (
            <Item key={item.id} item={item} />
         ))}
      </>
   )
}
