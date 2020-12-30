import React from 'react'
import Link from 'next/link';

import { Loader } from '../Common';

export default function Button({ to, disabled = false, variant = "primary",className, label = "Button",loading = false, onClick, ...otherProps }) {
   return (
      <button 
         disabled={disabled && true}
         onClick={onClick}
         className={`${variant === "primary" ? "btn-primary" : "btn-secondary"} ${className}`}
         {...otherProps}
      >
         {to ? 
            <Link href={to} >{label}</Link> :
            label}
         {loading && <div className="ml-2">
            <Loader size="sm"/>
         </div>}
      </button>
   )
}
