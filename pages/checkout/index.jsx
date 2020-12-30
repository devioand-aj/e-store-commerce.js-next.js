import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import _ from 'lodash';

import { Loader, Toast } from '../../components/Common';
import useCart from '../../hooks/useCart';
import useCheckout from '../../hooks/useCheckout';
import Form from '../../components/Checkout/AddressForm/Form';
import Payment from '../../components/Checkout/PaymentForm/Payment';

export default function checkout({ note }) {
   const router = useRouter();
   const { cartId } = useCart();
   const { token, onSetCheckoutToken, onSetUserDetail, userDetail, checkoutStep, onGenCheckoutToken, onSetToast, isToast, toast } = useCheckout();

   useEffect(() => {
      if (!(_.isEmpty(token)) || !cartId) return;

      getGeneratedToken(cartId);
   }, [cartId]);

   useEffect(() => {
      return () => {
         onSetToast(false, "");
         onSetUserDetail({});
         onSetCheckoutToken({});
      }
   }, [])

   const getGeneratedToken = async (cartId) => {
      const { error } = await onGenCheckoutToken({ cartId });

      if (error) return setTimeout(() => {
         router.back();
      }, 2000);
   }


   return (
      <div className="flex flex-col px-3 py-6 items-center">
         {/* <h2 className="text-center mb-2">{note}</h2> */}
         {checkoutStep === 0 && <Loader size="sm" />}
         {isToast && <Toast toast={toast} isCloaseAble={false} />}
         {checkoutStep === 1 && <Form defaultValues={userDetail} />}
         {checkoutStep === 2 && <Payment />}
      </div>
   )
}

export async function getStaticProps() {
   return {
     props: {
        note: "You may use dummy address, it's developm phase :)"
     },
   }
 }


