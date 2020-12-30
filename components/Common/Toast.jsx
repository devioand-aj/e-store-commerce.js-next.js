import React from 'react';
import { FiInfo } from 'react-icons/fi';
import { GiCancel } from 'react-icons/gi';

export default function Toast({ toast, className, onClose, isCloaseAble = true }) {
   return (
      <ToastWrapper className={className}>
         <ToastMessageSection toast={toast} />
         {isCloaseAble && <ToastCloseSection onClick={onClose} />}
      </ToastWrapper>
   )
}

function ToastWrapper({ children, className }) {
   return (
      <div className={`${className} flex justify-center`}>
         <div className="animate-zoomInOut flex justify-between bg-primary px-4 py-2">
            {children}
         </div>
      </div>
   )
}

function ToastMessageSection({ toast }) {
   return (
      <div className="flex">
         <div className="flex justify-center items-center mr-2">
            <FiInfo className="text-2xl" />
         </div>   
         <div className="text-base md:text-lg font-medium">{toast}</div>
      </div>
   )
}

function ToastCloseSection({ onClick }) {
   return (
      <div className="flex ml-8">
         <div className="cursor-pointer animate-pulse active:scale-95 transform flex justify-center items-center">
            <GiCancel onClick={onClick}  className="text-2xl"  />
         </div>
      </div>
   )
}



