import React from 'react'
import { useRouter } from 'next/router';
import { BiArrowBack } from 'react-icons/bi';
import { MdClose } from 'react-icons/md';

import useCheckout from '../../hooks/useCheckout';
import Stepper from './Stepper';

export default function FormWrapper({ children }) {
   const { onSetCheckoutStep, checkoutStep } = useCheckout()

   const handleClickBack = (step) => {
      onSetCheckoutStep(step)
   }

   return (
      <div className=" flex flex-col items-center px-9 xs:py-4 w-full xs:w-35r bg-gray-50">
         <Header currStep={checkoutStep} onClickBack={handleClickBack} />
         {children}
      </div>
   )
}

function Header({ currStep, onClickBack }) {
   const router = useRouter();

   return (
      <>
         <div className="relative flex flex-col w-full p-0 items-center justify-center">
            {currStep > 1 && <BiArrowBack  
               onClick={() => onClickBack(currStep - 1)}
               className="absolute cursor-pointer select-none left-1 text-3xl items-center justify-start" 
               />}
            <MdClose 
               className="absolute cursor-pointer select-none right-1 text-3xl items-center justify-start" 
               onClick={() => router.back()}
               />
            <h1 className="text-center my-1 mb-4 p-0">Checkout</h1>
            <Stepper value={currStep} items={stepperItems} />
         </div>
      </>
   )
}

const stepperItems = [
   { label: "Shipping Address", value: 1 },
   { label: "Payment", value: 2 },
]
