import React from 'react';
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

   const handleConfirmOrder = async () => {
      const { capturedOrder, error } = await onOrderConfirm();

      if (!error) router.replace("/checkout/done");
   }

   return (
      <FormWrapper>
         <Items items={checkoutToken.live.line_items} />
         <Total total={checkoutToken.live.subtotal.formatted_with_code} />
         <Button onClick={handleConfirmOrder} label="Done" className="my-4" />
      </FormWrapper>
   )
}
