import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
 
import { Button } from '../../Common'
import useCheckout from '../../../hooks/useCheckout'
import FormWrapper from '../Wrapper'
import Items from './Items';
import Total from './Total';

export default function Payment() {
   const router = useRouter();
   const { checkoutToken } = useCheckout()
   const { onOrderConfirm } = useCheckout();
   
   const [loading, setLoading] = useState(false);

   useEffect(() => {
      console.log('useEffect')
      return () => {
         setLoading(false)
      }
   }, [])

   const handleConfirmOrder = async () => {
      setLoading(true);
      
      const { error } = await onOrderConfirm();
      
      if (!error) router.replace("/checkout/done");

      setTimeout(() => {
         setLoading(false);
      }, 3000);
   }

   return (
      <FormWrapper>
         <Items items={checkoutToken.live.line_items} />
         <Total total={checkoutToken.live.subtotal.formatted_with_code} />
         <Button loading={loading} disabled={loading && true} onClick={handleConfirmOrder} label="Done" className="my-4" />
      </FormWrapper>
   )
}
