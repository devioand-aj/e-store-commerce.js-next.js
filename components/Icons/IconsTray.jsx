import React from 'react'

export default function IconsTray({ children, className }) {
   return (
      <div className={`flex flex-row ${className}`}>
         {children}
      </div>
   )
}
