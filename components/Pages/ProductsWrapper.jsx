import React from 'react'

export default function ProductsWrapper({ children, className }) {
   return (
      <div className={`container my-4 ${className}`}>
         {children}
      </div>
   )
}
