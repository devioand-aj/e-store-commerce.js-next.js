import React from 'react'
import Card from './Card';
import RoundedCard from './RoundedCard';

export default function Items({ items = [], variant }) {

   if (variant === "rounded") return (
      <>
         {items.map(item => (
            <RoundedCard key={item.id} item={item} />
         ))}
      </>
   )

   return (
      <>
         {items.map(item => (
            <Card key={item.id} item={item} variant={variant} />
         ))}
      </>
   )
}
