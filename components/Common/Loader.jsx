import React from 'react'

import PreLoader from '../../public/loader.svg';
import PreLoaderSmall from '../../public/loader2.svg';

export default function Loader({ size = "lg", className }) {
   return (
      <div className={`flex justify-center items-center ${className}`}>
         {size === "lg" ? <PreLoader /> : <PreLoaderSmall />}
      </div>
   )
}
